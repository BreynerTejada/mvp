from datetime import date, time
from django.test import TestCase

from barbershop.domain.models import (
    Service, Barber, BarberSchedule, Client, Appointment
)
from barbershop.domain.enums import AppointmentStatus, DayOfWeek
from barbershop.domain.exceptions import InvalidStateTransitionError
from barbershop.application.services.appointment_service import AppointmentService
from barbershop.application.appointment_states import get_state

class AppointmentStateTest(TestCase):

    def setUp(self):
        self.barber = Barber.objects.create(
            first_name='Santiago', last_name='Pérez',
            phone='3003333333', specialty='Senior Barber'
        )
        self.service = Service.objects.create(
            name='Diseño de Barba', price=15000, duration_minutes=20
        )
        self.client = Client.objects.create(
            first_name='Andrés', last_name='García', phone='3004444444'
        )
        BarberSchedule.objects.create(
            barber=self.barber,
            day_of_week=DayOfWeek.MONDAY,
            start_time=time(8, 0),
            end_time=time(18, 0)
        )
        self.appointment_service = AppointmentService()
        self.monday = date(2025, 1, 13)

    def _create_appointment(self):
        return self.appointment_service.create_appointment(
            client=self.client,
            barber=self.barber,
            service=self.service,
            appointment_date=self.monday,
            start_time=time(10, 0),
        )

    def test_pending_to_confirmed(self):
        
        appointment = self._create_appointment()
        self.assertEqual(appointment.status, AppointmentStatus.PENDING)
        updated = self.appointment_service.change_status(
            appointment, AppointmentStatus.CONFIRMED
        )
        self.assertEqual(updated.status, AppointmentStatus.CONFIRMED)

    def test_pending_to_cancelled(self):
        
        appointment = self._create_appointment()
        updated = self.appointment_service.change_status(
            appointment, AppointmentStatus.CANCELLED
        )
        self.assertEqual(updated.status, AppointmentStatus.CANCELLED)

    def test_confirmed_to_completed(self):
        
        appointment = self._create_appointment()
        self.appointment_service.change_status(
            appointment, AppointmentStatus.CONFIRMED
        )
        updated = self.appointment_service.change_status(
            appointment, AppointmentStatus.COMPLETED
        )
        self.assertEqual(updated.status, AppointmentStatus.COMPLETED)

    def test_completed_cannot_change(self):
        
        appointment = self._create_appointment()
        self.appointment_service.change_status(
            appointment, AppointmentStatus.CONFIRMED
        )
        self.appointment_service.change_status(
            appointment, AppointmentStatus.COMPLETED
        )
        with self.assertRaises(InvalidStateTransitionError):
            self.appointment_service.change_status(
                appointment, AppointmentStatus.PENDING
            )

    def test_cancelled_cannot_change(self):
        
        appointment = self._create_appointment()
        self.appointment_service.change_status(
            appointment, AppointmentStatus.CANCELLED
        )
        with self.assertRaises(InvalidStateTransitionError):
            self.appointment_service.change_status(
                appointment, AppointmentStatus.CONFIRMED
            )

    def test_pending_to_completed_invalid(self):
        
        appointment = self._create_appointment()
        with self.assertRaises(InvalidStateTransitionError):
            self.appointment_service.change_status(
                appointment, AppointmentStatus.COMPLETED
            )

    def test_state_pattern_transitions_unit(self):
        
        pending = get_state(AppointmentStatus.PENDING)
        self.assertTrue(pending.can_transition_to(AppointmentStatus.CONFIRMED))
        self.assertTrue(pending.can_transition_to(AppointmentStatus.CANCELLED))
        self.assertFalse(pending.can_transition_to(AppointmentStatus.COMPLETED))

        confirmed = get_state(AppointmentStatus.CONFIRMED)
        self.assertTrue(confirmed.can_transition_to(AppointmentStatus.COMPLETED))
        self.assertTrue(confirmed.can_transition_to(AppointmentStatus.CANCELLED))
        self.assertFalse(confirmed.can_transition_to(AppointmentStatus.PENDING))
