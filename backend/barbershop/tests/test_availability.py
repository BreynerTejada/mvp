from datetime import date, time
from django.test import TestCase

from barbershop.domain.models import (
    Service, Barber, BarberSchedule, Client, Appointment
)
from barbershop.domain.enums import AppointmentStatus, DayOfWeek
from barbershop.application.services.availability_service import (
    AvailabilityService,
    StandardAvailabilityStrategy,
)

class AvailabilityServiceTest(TestCase):

    def setUp(self):
        self.barber = Barber.objects.create(
            first_name='Diego', last_name='Reyes',
            phone='3001234567', specialty='Master Barber'
        )
        self.service_30 = Service.objects.create(
            name='Corte Básico', price=20000, duration_minutes=30
        )
        self.service_60 = Service.objects.create(
            name='Corte & Barba', price=28000, duration_minutes=60
        )
        self.client = Client.objects.create(
            first_name='Carlos', last_name='López', phone='3009876543'
        )

        BarberSchedule.objects.create(
            barber=self.barber,
            day_of_week=DayOfWeek.MONDAY,
            start_time=time(8, 0),
            end_time=time(12, 0)
        )
        self.service = AvailabilityService()
        self.monday = date(2025, 1, 13)

    def test_all_slots_available_no_appointments(self):
        
        slots = self.service.get_available_slots(
            self.barber, self.monday, 30, slot_interval_minutes=30
        )

        self.assertEqual(len(slots), 8)
        self.assertEqual(slots[0]['start_time'], '08:00')
        self.assertEqual(slots[-1]['start_time'], '11:30')

    def test_slot_blocked_by_existing_appointment(self):
        
        Appointment.objects.create(
            client=self.client,
            barber=self.barber,
            service=self.service_30,
            date=self.monday,
            start_time=time(9, 0),
            end_time=time(9, 30),
            status=AppointmentStatus.CONFIRMED
        )
        slots = self.service.get_available_slots(
            self.barber, self.monday, 30, slot_interval_minutes=30
        )
        start_times = [s['start_time'] for s in slots]
        self.assertNotIn('09:00', start_times)
        self.assertIn('08:00', start_times)
        self.assertIn('09:30', start_times)

    def test_no_slots_on_non_working_day(self):
        
        sunday = date(2025, 1, 19)
        slots = self.service.get_available_slots(
            self.barber, sunday, 30
        )
        self.assertEqual(len(slots), 0)

    def test_long_service_reduces_available_slots(self):
        
        slots_30 = self.service.get_available_slots(
            self.barber, self.monday, 30, slot_interval_minutes=30
        )
        slots_60 = self.service.get_available_slots(
            self.barber, self.monday, 60, slot_interval_minutes=30
        )
        self.assertGreater(len(slots_30), len(slots_60))

    def test_cancelled_appointments_dont_block_slots(self):
        
        Appointment.objects.create(
            client=self.client,
            barber=self.barber,
            service=self.service_30,
            date=self.monday,
            start_time=time(9, 0),
            end_time=time(9, 30),
            status=AppointmentStatus.CANCELLED
        )
        slots = self.service.get_available_slots(
            self.barber, self.monday, 30, slot_interval_minutes=30
        )
        start_times = [s['start_time'] for s in slots]
        self.assertIn('09:00', start_times)

    def test_overlapping_service_blocks_overlapped_slots(self):
        
        Appointment.objects.create(
            client=self.client,
            barber=self.barber,
            service=self.service_60,
            date=self.monday,
            start_time=time(9, 0),
            end_time=time(10, 0),
            status=AppointmentStatus.CONFIRMED
        )
        slots = self.service.get_available_slots(
            self.barber, self.monday, 30, slot_interval_minutes=30
        )
        start_times = [s['start_time'] for s in slots]
        self.assertNotIn('09:00', start_times)
        self.assertNotIn('09:30', start_times)
        self.assertIn('08:00', start_times)
        self.assertIn('10:00', start_times)
