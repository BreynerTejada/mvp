import logging
from abc import ABC, abstractmethod
from typing import List

logger = logging.getLogger(__name__)


class AppointmentObserver(ABC):

    @abstractmethod
    def on_appointment_created(self, appointment) -> None:
        pass

    @abstractmethod
    def on_appointment_status_changed(self, appointment, old_status: str, new_status: str) -> None:
        pass


class LoggingObserver(AppointmentObserver):

    def on_appointment_created(self, appointment) -> None:
        logger.info(
            f"[CITA CREADA] "
            f"Cliente: {appointment.client} | "
            f"Barbero: {appointment.barber} | "
            f"Servicio: {appointment.service.name} | "
            f"Fecha: {appointment.date} {appointment.start_time.strftime('%H:%M')}"
        )

    def on_appointment_status_changed(self, appointment, old_status: str, new_status: str) -> None:
        logger.info(
            f"[CITA ACTUALIZADA] "
            f"Estado: {old_status} → {new_status}"
        )


class AppointmentEventManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._observers: List[AppointmentObserver] = []
        return cls._instance

    def subscribe(self, observer: AppointmentObserver) -> None:
        if observer not in self._observers:
            self._observers.append(observer)

    def unsubscribe(self, observer: AppointmentObserver) -> None:
        self._observers.remove(observer)

    def notify_created(self, appointment) -> None:
        for observer in self._observers:
            observer.on_appointment_created(appointment)

    def notify_status_changed(self, appointment, old_status: str, new_status: str) -> None:
        for observer in self._observers:
            observer.on_appointment_status_changed(appointment, old_status, new_status)


def register_default_observers():
    from barbershop.application.notifications import WhatsAppObserver

    manager = AppointmentEventManager()
    manager.subscribe(LoggingObserver())
    manager.subscribe(WhatsAppObserver())
