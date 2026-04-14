from abc import ABC, abstractmethod
from datetime import datetime, timedelta, time, date
from typing import List

from barbershop.domain.models import Barber, BarberSchedule, Appointment
from barbershop.domain.enums import AppointmentStatus


class AvailabilityStrategy(ABC):

    @abstractmethod
    def get_available_slots(
        self,
        barber: Barber,
        target_date: date,
        duration_minutes: int,
        slot_interval_minutes: int = 30
    ) -> List[dict]:
        pass


class StandardAvailabilityStrategy(AvailabilityStrategy):

    def get_available_slots(
        self,
        barber: Barber,
        target_date: date,
        duration_minutes: int,
        slot_interval_minutes: int = 30
    ) -> List[dict]:
        day_of_week = target_date.isoweekday()
        schedule = BarberSchedule.objects.filter(
            barber=barber,
            day_of_week=day_of_week
        ).first()

        if not schedule:
            return []

        existing_appointments = Appointment.objects.filter(
            barber=barber,
            date=target_date,
            status__in=[
                AppointmentStatus.PENDING,
                AppointmentStatus.CONFIRMED,
                AppointmentStatus.COMPLETED,
            ]
        ).values_list('start_time', 'end_time')

        booked_intervals = [
            (appt_start, appt_end) for appt_start, appt_end in existing_appointments
        ]

        available_slots = []
        current = datetime.combine(target_date, schedule.start_time)
        end_of_day = datetime.combine(target_date, schedule.end_time)
        service_duration = timedelta(minutes=duration_minutes)
        slot_step = timedelta(minutes=slot_interval_minutes)

        while current + service_duration <= end_of_day:
            slot_start = current.time()
            slot_end = (current + service_duration).time()

            if not self._overlaps_any(slot_start, slot_end, booked_intervals):
                available_slots.append({
                    'start_time': slot_start.strftime('%H:%M'),
                    'end_time': slot_end.strftime('%H:%M'),
                })

            current += slot_step

        return available_slots

    @staticmethod
    def _overlaps_any(start: time, end: time, booked: list) -> bool:
        for booked_start, booked_end in booked:
            if start < booked_end and end > booked_start:
                return True
        return False


class AvailabilityService:

    def __init__(self, strategy: AvailabilityStrategy = None):
        self._strategy = strategy or StandardAvailabilityStrategy()

    def set_strategy(self, strategy: AvailabilityStrategy):
        self._strategy = strategy

    def get_available_slots(
        self,
        barber: Barber,
        target_date: date,
        duration_minutes: int,
        slot_interval_minutes: int = 30
    ) -> List[dict]:
        return self._strategy.get_available_slots(
            barber, target_date, duration_minutes, slot_interval_minutes
        )
