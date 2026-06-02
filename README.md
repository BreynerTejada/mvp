# BarberShop — MVP

Plataforma full-stack para la operación integral de una barbería, con tres portales diferenciados (Administrador, Barbero, Cliente), motor de reservas con verificación de disponibilidad
> desarrollado siguiendo principios SOLID y patrones de diseño GoF (Factory, State, Strategy, Observer, Facade, Singleton).

---

## Tabla de contenidos
- [Descripción general](#descripción-general)
- [Integrantes](#integrantes)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Funcionalidades implementadas](#funcionalidades-implementadas)
- [Requisitos de instalación](#requisitos-de-instalación)
- [Pasos para ejecutar el proyecto](#pasos-para-ejecutar-el-proyecto)
- [Credenciales de prueba](#credenciales-de-prueba)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Diagramas](#diagramas)
- [Documentación adicional](#documentación-adicional)
- [Capturas](#capturas)

---

## Descripción general

BarberShop permite a un equipo de barberos:
- Publicar su catálogo de servicios.
- Recibir reservas online sin fricción (sin necesidad de registro previo).
- Administrar el ciclo de vida de cada cita (pendiente → confirmada → completada / cancelada).
  
La aplicación expone tres experiencias completas según el rol del usuario autenticado: **Admin**, **Barbero** y **Cliente**.

---

## Tecnologías utilizadas

| Capa          | Stack                                                                |
|---------------|----------------------------------------------------------------------|
| Frontend      | React 18 · TypeScript · Vite · MUI v5 · React Router 6 · Axios       |
| Backend       | Django 4.2 · Django REST Framework · SimpleJWT                       |
| Base de datos | PostgreSQL 15                                                        |
| Infraestructura | Docker · Docker Compose                                            |

---

## Funcionalidades implementadas

### Sitio público
- Landing con propuesta de valor y CTA a agendar.
- Catálogo de servicios con badges (`POPULAR`, `PREMIUM`).
- **Flujo de reserva en 4 pasos** (servicio → barbero → fecha/hora → datos) con cálculo de slots disponibles en tiempo real.
- Login único para los 3 roles, con redirección automática al portal correcto.

### Portal Admin (`/admin/*`)
- **Citas**: tabla completa con fecha/hora, cliente, barbero, servicio, estado y acciones (editar/eliminar). Modal de creación con validaciones.
- **Barberos**: listado con avatar + rol, alta por modal (crea Usuario automáticamente).
- **Clientes**: directorio de clientes (registrados o creados al reservar).
- **Servicios**: catálogo con duración, precio y badge.

### Portal Barbero (`/barbero/horario`)
- Vista personalizada con saludo y citas asignadas.
- Acción de **cambiar estado** restringida a transiciones válidas (State Pattern).
- Cada transición dispara notificación WhatsApp al cliente.

### Portal Cliente (`/cliente/historial`)
- Saludo personalizado + historial de visitas anteriores y citas confirmadas.

### Calidad de código
- Arquitectura en capas: `api` ↔ `application` ↔ `domain`.
- 6 patrones GoF aplicados.
- Principios SOLID en la organización de servicios y observers.

> Detalle exhaustivo en [`FUNCIONALIDADES.md`](./FUNCIONALIDADES.md).

---

## Requisitos de instalación

- **Docker** ≥ 24 y **Docker Compose** v2.
- Puertos libres: `3000` (frontend), `8001` (backend), `5433` (Postgres).

No necesitas instalar Python, Node ni Postgres localmente: todo corre en contenedores.

---

## Pasos para ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd mvp

# 2. (Opcional) personalizar variables de entorno
cp .env.example .env

# 3. Levantar todo el stack
docker compose up --build

# 4. (Solo primera vez) los seeders corren automáticamente.
#    Verás algo como "6 servicios creados / 3 barberos creados / 9 citas creadas"

# 5. Acceder
#    Frontend: http://localhost:3000
#    Backend:  http://localhost:8001/api/
#    Admin Django: http://localhost:8001/admin (admin/admin)
```

Para detener:
```bash
docker compose down
```

Para reset total (borra BD y reseed):
```bash
docker compose down -v
docker compose up --build
```

---

## Credenciales de prueba

| Rol     | Usuario   | Contraseña |
|---------|-----------|------------|
| Admin   | `admin`   | `admin`    |
| Barbero | `marcus`  | `barber`   |
| Barbero | `david`   | `barber`   |
| Barbero | `james`   | `barber`   |
| Cliente | `michael` | `cliente`  |
| Cliente | `jim`     | `cliente`  |
| Cliente | `dwight`  | `cliente`  |
| Cliente | `pam`     | `cliente`  |
| Cliente | `ryan`    | `cliente`  |
| Cliente | `andy`    | `cliente`  |

> Todos los datos seed se crean en `backend/barbershop/management/commands/seed_data.py`.

---

## Estructura del repositorio

```
mvp/
├── backend/                       # Django + DRF
│   ├── barbershop/
│   │   ├── domain/                # Modelos, enums, exceptions, validators
│   │   ├── application/           # Servicios, factory, states, observers, notifications
│   │   ├── api/                   # Views, serializers, urls, permissions
│   │   ├── management/commands/   # seed_data
│   │   ├── migrations/
│   │   └── tests/
│   ├── config/                    # settings, urls, wsgi
│   ├── manage.py
│   └── Dockerfile
├── frontend/                      # React + TS + MUI
│   ├── src/
│   │   ├── api/                   # client.ts, types.ts
│   │   ├── components/
│   │   │   ├── styled/            # DarkCard, GoldButton, DataTable, AppointmentStatusChip, ...
│   │   │   ├── layout/            # NavbarContainer, DashboardLayout, portalLayouts/
│   │   │   └── appointment/       # Pasos del flujo de reserva
│   │   ├── context/AuthContext.tsx
│   │   ├── hooks/                 # useBarbers, useServices, useAppointments, useAvailability
│   │   ├── pages/
│   │   │   ├── homePage/
│   │   │   ├── servicesPage/
│   │   │   ├── bookingPage/
│   │   │   ├── loginPage/
│   │   │   ├── adminCitasPage/
│   │   │   ├── adminBarberosPage/
│   │   │   ├── adminClientesPage/
│   │   │   ├── adminServiciosPage/
│   │   │   ├── barberHorarioPage/
│   │   │   └── clienteHistorialPage/
│   │   ├── theme.ts
│   │   └── App.tsx
│   └── Dockerfile
├── diagrams/                      # PlantUML (C4, actividades, estados)
├── .screenshots/                  # Capturas de pantalla del MVP
├── docker-compose.yml
├── .env.example
├── FUNCIONALIDADES.md             # Detalle funcional, patrones y flujos
└── README.md
```

Cada componente del frontend sigue el patrón **Container / View / Styles** (ver `CLAUDE.md`).

---

## Documentación adicional

- [`FUNCIONALIDADES.md`](./FUNCIONALIDADES.md) — funcionalidades, patrones GoF, principios SOLID, endpoints, flujos alternativos.
- [`CLAUDE.md`](./CLAUDE.md) — convenciones de arquitectura del frontend (Container/View/Styles).

---

## Capturas

Ubicadas en [`.screenshots/`](./.screenshots/):

| Archivo                       | Descripción                              |
|-------------------------------|------------------------------------------|
| `01-home.png`                 | Home pública                             |
| `02-admin-citas.png`          | Admin — listado de citas                 |
| `03-admin-barberos.png`       | Admin — gestionar barberos               |
| `04-admin-servicios.png`      | Admin — catálogo de servicios            |
| `05-admin-clientes.png`       | Admin — directorio de clientes           |
| `06-admin-citas-modal.png`    | Admin — modal crear cita                 |
| `07-barber-portal.png`        | Portal del barbero                       |
| `08-client-portal.png`        | Portal del cliente                       |
| `09-agendar.png`              | Flujo público de reserva                 |

---

## Buenas prácticas de versionamiento

- Commits descriptivos y autocontenidos.
- `.env.example` documentado; `.env` ignorado en `.gitignore`.
- Migraciones de Django versionadas.
- `package-lock.json` y `requirements.txt` con versiones fijadas.

---

## Licencia

Uso académico. Todos los derechos reservados a los autores.
