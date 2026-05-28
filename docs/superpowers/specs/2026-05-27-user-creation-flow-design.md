# Diseño: Flujo claro de creación de usuarios

**Fecha:** 2026-05-27  
**Problema:** No existe una forma clara de que barberos y clientes obtengan credenciales de acceso.

---

## Contexto

Tres escenarios de creación de usuario están rotos:

1. **Barbero (admin crea):** Se genera una contraseña aleatoria de 16 caracteres en `BarberViewSet.perform_create` pero nunca se expone — el barbero no puede iniciar sesión.
2. **Cliente vía booking:** `_get_or_create_client` fija la contraseña como el literal `'cliente'` — el cliente no sabe sus credenciales.
3. **Cliente vía admin:** `ClientViewSet.perform_create` también usa `'cliente'` como contraseña hardcodeada.

---

## Flujo 1: Creación de Barbero

### Backend

**`BarberSerializer`**
- Agrega campo `password` de tipo `CharField(write_only=True, required=True, min_length=6)`.
- No se devuelve en ninguna respuesta (write-only).

**`BarberViewSet.perform_create`**
- Lee `password` de `validated_data` en lugar de llamar `make_random_password`.
- Llama `User.objects.create_user(username=..., email=..., password=data['password'])`.

### Frontend

**`BarberFormData` (types.ts)**
- Agrega campo `password: string`.

**`AdminBarberosPageContainer`**
- `buildEmptyForm()` inicializa `password: ''`.
- `handleFormChange` maneja el campo `password`.

**`AdminBarberosPageView`**
- El modal incluye un campo "Contraseña" de tipo `password` con toggle de visibilidad (ícono de ojo).
- Validación de frontend: no vacío antes de habilitar el botón de guardar.

---

## Flujo 2: Cliente en Booking

### Backend

**`AppointmentCreateSerializer`**
- Agrega campo `client_password` opcional: `CharField(required=False, allow_blank=True, default='', write_only=True, min_length=0)`.

**`AppointmentViewSet._get_or_create_client`**
- **Cliente existente (mismo teléfono):** retorna el cliente sin modificar su cuenta. No sobrescribe contraseña.
- **Cliente nuevo:**
  - Si `client_password` fue provisto (no vacío): usa esa contraseña.
  - Si no: usa el número de teléfono como contraseña temporal.
  - Retorna una tupla `(client, is_new, credentials)` donde `credentials = {username, temp_password}` solo si no se proveyó contraseña.

**`AppointmentViewSet.create`**
- Pasa `client_password` a `_get_or_create_client`.
- Si el cliente es nuevo y no estableció contraseña, incluye en la respuesta el campo `client_credentials: {username: str, temp_password: str}`.
- Si el cliente ya existía o estableció su contraseña, `client_credentials` no aparece en la respuesta.

### Frontend

**`ClientData` (types.ts en appointment/)**
- Agrega campo `password?: string`.

**`DetailsStepView`**
- Agrega campo "Contraseña (opcional)" con:
  - Toggle de visibilidad (ícono de ojo).
  - Helper text: "Para acceder a tu historial de citas".
- Validación: si se llenó, mínimo 6 caracteres.

**`BookingPageContainer.handleConfirm`**
- Incluye `client_password: clientData.password` en el payload si está definido y no vacío.

**`ConfirmationView`**
- Recibe prop opcional `clientCredentials?: { username: string; temp_password: string }`.
- Si está presente, muestra un bloque informativo (alerta tipo `info`) con:
  - "Cuenta creada. Guarda estas credenciales:"
  - Usuario y contraseña temporal.
  - Link a `/login`.

---

## Flujo 3: Cliente creado desde el panel admin

**`ClientViewSet.perform_create`**
- Agrega campo `password` al `ClientSerializer` (write-only, opcional, default al teléfono).
- Si el admin no especifica contraseña, se usa el teléfono como contraseña temporal.
- La respuesta incluye `temp_password` cuando se generó automáticamente para que el admin pueda comunicársela al cliente.

---

## Casos borde

- **Teléfono duplicado en booking:** si ya existe un cliente con ese teléfono, se crea la cita y se asocia al cliente existente sin tocar su contraseña.
- **Email vacío:** los campos de email siguen siendo opcionales en todos los flujos.
- **Username collision:** la lógica de generación de username con sufijo numérico (`base_1`, `base_2`, ...) se mantiene igual.

---

## Archivos afectados

**Backend:**
- `backend/barbershop/api/serializers/barber.py`
- `backend/barbershop/api/views/barber.py`
- `backend/barbershop/api/serializers/appointment.py`
- `backend/barbershop/api/views/appointment.py`
- `backend/barbershop/api/serializers/client.py`
- `backend/barbershop/api/views/client.py`

**Frontend:**
- `frontend/src/pages/adminBarberosPage/types.ts`
- `frontend/src/pages/adminBarberosPage/AdminBarberosPageContainer.tsx`
- `frontend/src/pages/adminBarberosPage/AdminBarberosPageView.tsx`
- `frontend/src/components/appointment/detailsStep/DetailsStepContainer.tsx`
- `frontend/src/components/appointment/detailsStep/DetailsStepView.tsx`
- `frontend/src/components/appointment/types.ts`
- `frontend/src/components/appointment/confirmationView/ConfirmationView.tsx`
- `frontend/src/pages/bookingPage/BookingPageContainer.tsx`
- `frontend/src/api/types.ts`
- `frontend/src/api/client.ts`
