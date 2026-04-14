from datetime import datetime, timedelta

from barbershop.domain.models import Appointment, Service, Barber, Client
from barbershop.domain.enums import AppointmentStatus
from barbershop.domain.exceptions import (
    TimeSlotUnavailableError,
    BarberNotAvailableError,
    AppointmentOverlapError,
)
from barbershop.application.services.availability_service import AvailabilityService

class AppointmentFactory:

    def __init__(self, availability_service: AvailabilityService = None):
        self._availability_service = availability_service or AvailabilityService()

    def create_appointment(
        self,
        client: Client,
        barber: Barber,
        service: Service,
        date,
        start_time,
        notes: str = ""
    ) -> Appointment:

        start_dt = datetime.combine(date, start_time)
        end_dt = start_dt + timedelta(minutes=service.duration_minutes)
        end_time = end_dt.time()

        available_slots = self._availability_service.get_available_slots(
            barber=barber,
            target_date=date,
            duration_minutes=service.duration_minutes,
            slot_interval_minutes=1
        )

        if not available_slots:
            raise BarberNotAvailableError()

        start_str = start_time.strftime('%H:%M')
        end_str = end_time.strftime('%H:%M')
        slot_found = any(
            s['start_time'] == start_str and s['end_time'] == end_str
            for s in available_slots
        )

        if not slot_found:
            raise AppointmentOverlapError()

        appointment = Appointment(
            client=client,
            barber=barber,
            service=service,
            date=date,
            start_time=start_time,
            end_time=end_time,
            status=AppointmentStatus.PENDING,
            notes=notes,
        )
        appointment.save()
        return appointment
