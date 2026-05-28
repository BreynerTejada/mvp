# Funcionalidades del MVP — BarberShop

Este documento detalla las funcionalidades implementadas en el MVP, su relación con los casos de uso y diagramas, y la evidencia técnica del cumplimiento de buenas prácticas (patrones GoF y principios SOLID).

---

## 1. Visión general

BarberShop es una plataforma para gestionar la operación de una barbería: catálogo de servicios, equipo de barberos, agenda de citas y comunicación con clientes vía WhatsApp. El MVP soporta tres roles con experiencias diferenciadas: **Administrador**, **Barbero** y **Cliente**.

---

## 2. Roles, credenciales y flujo de acceso

Al ejecutar `docker compose up`, el seeder crea los siguientes usuarios:

| Rol         | Usuario       | Contraseña | Vista por defecto       |
|-------------|---------------|------------|-------------------------|
| Admin       | `admin`       | `admin`    | `/admin/citas`          |
| Barbero     | `marcus`      | `barber`   | `/barbero/horario`      |
| Barbero     | `david`       | `barber`   | `/barbero/horario`      |
| Barbero     | `james`       | `barber`   | `/barbero/horario`      |
| Cliente     | `michael`     | `cliente`  | `/cliente/historial`    |
| Cliente     | `jim`         | `cliente`  | `/cliente/historial`    |
| Cliente     | `dwight`      | `cliente`  | `/cliente/historial`    |
| Cliente     | `pam`         | `cliente`  | `/cliente/historial`    |
| Cliente     | `ryan`        | `cliente`  | `/cliente/historial`    |
| Cliente     | `andy`        | `cliente`  | `/cliente/historial`    |

> El login redirige automáticamente al portal correspondiente según el rol. Las rutas protegidas evitan acceso cruzado entre portales.

---

## 3. Funcionalidades por rol

### 3.1 Sitio público (sin sesión)
- **Home** (`/`): hero, propuesta de valor y CTA a agendar.
- **Servicios** (`/servicios`): catálogo de servicios activos.
- **Agendar cita** (`/agendar`): flujo guiado en 4 pasos (servicio → barbero → fecha/hora → datos). No requiere login; si el cliente no existe, se crea junto con su cuenta (`phone` como username, password `cliente`).
- **Login** (`/login`): único punto de acceso para los tres roles.

### 3.2 Portal Administrador (`/admin/*`)
Layout con sidebar persistente: **ADMIN**, navegación a `Horario`, `Clientes`, `Servicios`, `Barberos` y `Volver al Sitio`.

| Página                | Funcionalidad                                                                                       |
|-----------------------|-----------------------------------------------------------------------------------------------------|
| `/admin/citas`        | Listado de **todas las citas** con fecha/hora, cliente, barbero, servicio, estado y acciones.        |
|                       | Botón **Crear**: modal con validaciones que crea cita usando `AppointmentService`.                   |
|                       | Botón **Editar**: cambia barbero, servicio, fecha, hora y notas (recalcula `end_time`).              |
|                       | Botón **Eliminar**: confirmación + borrado.                                                          |
| `/admin/barberos`     | Listado de barberos con avatar + rol/especialidad + acción eliminar (soft).                          |
|                       | Botón **Crear**: modal que crea el barbero y su cuenta de usuario asociada automáticamente.          |
| `/admin/clientes`     | Listado de clientes con avatar, email y teléfono.                                                    |
| `/admin/servicios`    | Catálogo de servicios con duración, precio y badge de popularidad.                                   |

### 3.3 Portal Barbero (`/barbero/horario`)
- Saludo personalizado **“Hola, {nombre}”**.
- Listado de **mis citas** (filtro de servidor: el endpoint `/appointments/mine/` retorna solo las del barbero autenticado).
- Acción **Cambiar Estado** según máquina de estados:
  - `PENDING` → `CONFIRMED` (botón “Confirmar”).
  - `CONFIRMED` → `COMPLETED` (botón “Completar”).
  - Estados terminales muestran botón deshabilitado.
- Cada transición dispara la notificación WhatsApp al cliente (Observer Pattern).

### 3.4 Portal Cliente (`/cliente/historial`)
- Saludo personalizado **“Bienvenido, {nombre}”**.
- Listado de **mis visitas** anteriores y citas confirmadas (orden descendente).
- Estado visible vía chip de color (Confirmado, Completado, Pendiente, Cancelado).

---

## 4. Flujos implementados

### 4.1 Flujo principal: Reservar una cita
1. Cliente entra a `/agendar` (sin sesión).
2. Selecciona servicio → barbero → fecha → slot disponible → datos personales.
3. El backend valida slot disponible (`AvailabilityService` con `StandardAvailabilityStrategy`).
4. `AppointmentService.create_appointment()` delega en `AppointmentFactory` → crea `Appointment` en estado `PENDING`.
5. `AppointmentEventManager` notifica a observers:
   - `LoggingObserver` registra en logs estructurados.
   - `WhatsAppObserver` envía mensaje al cliente con detalles.
6. Si el cliente no existía, se crea automáticamente con cuenta de usuario.

### 4.2 Flujos alternativos / de error
- **Slot ocupado**: `AppointmentFactory` levanta `AppointmentOverlapError` → API retorna 400.
- **Barbero sin horario ese día**: `BarberNotAvailableError` → 400.
- **Transición de estado inválida** (ej. `COMPLETED` → `PENDING`): `InvalidStateTransitionError` → 400. Implementa State Pattern.
- **Permisos**: Barbero no puede cambiar el estado de cita de otro barbero (403). Cliente solo ve sus propias citas. Admin tiene acceso completo.
- **Login fallido**: muestra mensaje claro sin filtrar información sensible.
- **WhatsApp no disponible**: si `CALLMEBOT_API_KEY` no está configurada, hace fallback a logs (sin romper el flujo de creación).

### 4.3 Diagrama de estados (implementado vía State Pattern)
```
PENDING ──(confirm)──▶ CONFIRMED ──(complete)──▶ COMPLETED
   │                       │
   └──(cancel)─▶ CANCELLED ◀──(cancel)──┘
```
Cada estado en `barbershop/application/appointment_states.py` declara sus `allowed_transitions()`. `transition_to()` lanza `InvalidStateTransitionError` si la transición no es válida.

---

## 5. Integración WhatsApp (CallMeBot)

Implementada como Observer Pattern (`barbershop/application/notifications.py`):
- `WhatsAppGateway` (interfaz / abstracción)
- `CallMeBotWhatsAppGateway` (implementación real)
- `ConsoleWhatsAppGateway` (fallback / desarrollo)
- `WhatsAppObserver` se suscribe a `AppointmentEventManager`:
  - `on_appointment_created` → mensaje de confirmación de reserva.
  - `on_appointment_status_changed` → notificación de cambio de estado.

### Configuración real
1. Cada destinatario envía un WhatsApp al bot oficial de CallMeBot (`+34 644 51 95 23`) con el texto `I allow callmebot to send me messages`.
2. CallMeBot responde con un `apikey`.
3. Setea la variable `CALLMEBOT_API_KEY` en `.env` (sirve para una API key del *sender* de cuenta única; en el repo se demuestra arquitectura no acoplada al proveedor).
4. Reinicia el backend: `docker compose restart backend`.

### Modo desarrollo
Si no hay `CALLMEBOT_API_KEY`, el observer usa `ConsoleWhatsAppGateway`: los mensajes se ven en `docker compose logs backend` sin enviar nada externo.

---

## 6. Validaciones y manejo de errores

| Capa            | Validación                                                              |
|-----------------|-------------------------------------------------------------------------|
| Serializers     | Tipos, longitudes, email, formato hora, IDs existentes.                 |
| Domain          | `clean()` en `BarberSchedule` (start < end), `phone_validator`.         |
| Application     | Disponibilidad, no solape, transiciones de estado.                      |
| API             | Conversión de excepciones de dominio (`BarberShopException`) → HTTP 400.|
| API             | Permisos por rol (`IsAdminOrReadOnly`, filtros `_filter_by_role`).      |
| Frontend        | `required`, tipos `email`, `date`, `time`. Alertas con MUI `Alert`.     |

---

## 7. Patrones GoF aplicados

| Patrón           | Implementación                                                   | Archivo                                              |
|------------------|------------------------------------------------------------------|------------------------------------------------------|
| **Factory Method** | `AppointmentFactory` encapsula creación con validaciones         | `application/factories.py`                           |
| **State**          | `AppointmentState` + `PendingState/ConfirmedState/...`           | `application/appointment_states.py`                  |
| **Strategy**       | `AvailabilityStrategy` ↔ `StandardAvailabilityStrategy`          | `application/services/availability_service.py`       |
| **Observer**       | `AppointmentEventManager`, `LoggingObserver`, `WhatsAppObserver` | `application/observers.py`, `application/notifications.py` |
| **Facade**         | `AppointmentService` orquesta factory/state/observers            | `application/services/appointment_service.py`        |
| **Singleton**      | `AppointmentEventManager` con `__new__`                          | `application/observers.py`                           |

## 8. Principios SOLID

- **S — Single Responsibility**: cada servicio/observer/state tiene una responsabilidad clara (creación, transición, notificación, disponibilidad).
- **O — Open/Closed**: añadir un nuevo medio de notificación = nuevo `AppointmentObserver` sin tocar `AppointmentService`. Añadir nueva estrategia de disponibilidad = nueva `AvailabilityStrategy`.
- **L — Liskov**: `CallMeBotWhatsAppGateway` y `ConsoleWhatsAppGateway` son intercambiables tras `WhatsAppGateway`. Los `AppointmentState` se comportan según contrato común.
- **I — Interface Segregation**: `AppointmentObserver` expone solo lo necesario (`on_appointment_created`, `on_appointment_status_changed`).
- **D — Dependency Inversion**: `AppointmentService` depende de abstracciones (`AvailabilityService`, observers). El gateway de WhatsApp se inyecta y se decide en runtime según env.

---

## 9. Coherencia con diagramas

- **`diagrams/activity_booking.puml`** (flujo de booking): coincide con `POST /api/appointments/` + `AppointmentService.create_appointment`.
- **`diagrams/activity_state.puml`** (estados): implementado 1:1 en `appointment_states.py`.
- **`diagrams/c4_components.puml`**: la separación API → Application → Domain está respetada (`api/views/*`, `application/*`, `domain/models/*`).
- **`diagrams/c4_containers.puml`** y **`c4_context.puml`**: tres contenedores `frontend` (React/Nginx), `backend` (Django/DRF) y `db` (Postgres) definidos en `docker-compose.yml`.

---

## 10. Tecnologías

| Capa        | Tecnología                                            |
|-------------|-------------------------------------------------------|
| Backend     | Django 4.2, Django REST Framework 3.15, SimpleJWT     |
| Base datos  | PostgreSQL 15                                         |
| Frontend    | React 18, TypeScript, Vite, MUI v5, Axios, React Router|
| Infra       | Docker + Docker Compose, Nginx (frontend prod)        |
| Notificación| CallMeBot (HTTP REST, gratuito)                       |

---

## 11. Endpoints principales

| Método | Endpoint                              | Rol             | Descripción                                     |
|--------|---------------------------------------|-----------------|-------------------------------------------------|
| POST   | `/api/token/`                         | Público         | Login (JWT)                                     |
| GET    | `/api/auth/me/`                       | Auth            | Perfil + rol + barber_id/client_id             |
| GET    | `/api/services/`                      | Público         | Catálogo de servicios                           |
| GET/POST/DELETE | `/api/barbers/`              | Público/Admin   | CRUD barberos                                   |
| GET    | `/api/barbers/{id}/availability/`     | Público         | Slots disponibles para una fecha/servicio       |
| GET    | `/api/clients/`                       | Admin           | Listado de clientes                             |
| GET    | `/api/clients/me/`                    | Cliente         | Perfil propio del cliente                       |
| GET    | `/api/appointments/`                  | Auth            | Citas (filtradas por rol)                       |
| POST   | `/api/appointments/`                  | Público         | Crear cita (registra cliente si no existe)      |
| GET    | `/api/appointments/mine/`             | Auth            | Mis citas (barber o cliente)                    |
| PATCH  | `/api/appointments/{id}/`             | Admin           | Editar cita                                     |
| DELETE | `/api/appointments/{id}/`             | Admin           | Eliminar cita                                   |
| PATCH  | `/api/appointments/{id}/status/`      | Admin/Barbero   | Cambiar estado (State Pattern)                  |

---

## 12. Capturas y evidencias

Todas las capturas se generan automáticamente al validar con Chrome DevTools MCP y se guardan en `.screenshots/`:

1. `01-home.png` — Home pública.
2. `02-admin-citas.png` — Admin / lista de citas.
3. `03-admin-barberos.png` — Admin / barberos.
4. `04-admin-servicios.png` — Admin / servicios.
5. `05-admin-clientes.png` — Admin / clientes.
6. `06-admin-citas-modal.png` — Modal crear cita.
7. `07-barber-portal.png` — Portal del barbero.
8. `08-client-portal.png` — Portal del cliente.
9. `09-agendar.png` — Flujo público de reserva.
