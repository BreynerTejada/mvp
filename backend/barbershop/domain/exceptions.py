class BarberShopException(Exception):
    pass


class TimeSlotUnavailableError(BarberShopException):
    def __init__(self, message="El horario seleccionado no está disponible."):
        super().__init__(message)


class InvalidStateTransitionError(BarberShopException):
    def __init__(self, current_status, target_status):
        self.current_status = current_status
        self.target_status = target_status
        super().__init__(
            f"No se puede cambiar de '{current_status}' a '{target_status}'."
        )


class BarberNotAvailableError(BarberShopException):
    def __init__(self, message="El barbero no está disponible en el horario solicitado."):
        super().__init__(message)


class AppointmentOverlapError(BarberShopException):
    def __init__(self, message="Ya existe una cita en ese horario para este barbero."):
        super().__init__(message)
