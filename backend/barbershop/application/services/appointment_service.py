from datetime import date, time

from barbershop.domain.models import Appointment, Service, Barber, Client
from barbershop.domain.enums import AppointmentStatus
from barbershop.domain.exceptions import BarberShopException
from barbershop.application.factories import AppointmentFactory
from barbershop.application.appointment_states import get_state
from barbershop.application.observers import AppointmentEventManager
from barbershop.application.services.availability_service import AvailabilityService


class AppointmentService:

    def __init__(self):
        self._availability_service = AvailabilityService()
        self._factory = AppointmentFactory(self._availability_service)
        self._event_manager = AppointmentEventManager()

    def get_available_slots(
        self,
        barber: Barber,
        target_date: date,
        duration_minutes: int,
        slot_interval_minutes: int = 30
    ) -> list:
        return self._availability_service.get_available_slots(
            barber, target_date, duration_minutes, slot_interval_minutes
        )

    def create_appointment(
        self,
        client: Client,
        barber: Barber,
        service: Service,
        appointment_date: date,
        start_time: time,
        notes: str = ""
    ) -> Appointment:
        appointment = self._factory.create_appointment(
            client=client,
            barber=barber,
            service=service,
            date=appointment_date,
            start_time=start_time,
            notes=notes,
        )
        self._event_manager.notify_created(appointment)
        return appointment

    def change_status(self, appointment: Appointment, new_status: str) -> Appointment:
        old_status = appointment.status
        state = get_state(old_status)

        validated_status = state.transition_to(new_status)

        appointment.status = validated_status
        appointment.save(update_fields=['status', 'updated_at'])

        self._event_manager.notify_status_changed(appointment, old_status, new_status)
        return appointment

    @staticmethod
    def get_barber_agenda(barber: Barber, target_date: date) -> list:
        return Appointment.objects.filter(
            barber=barber,
            date=target_date,
        ).exclude(
            status=AppointmentStatus.CANCELLED
        ).select_related('client', 'service').order_by('start_time')
