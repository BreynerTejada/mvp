from datetime import date, time
from django.test import TestCase

from barbershop.domain.models import (
    Service, Barber, BarberSchedule, Client, Appointment
)
from barbershop.domain.enums import AppointmentStatus, DayOfWeek
from barbershop.domain.exceptions import (
    BarberNotAvailableError,
    AppointmentOverlapError,
)
from barbershop.application.services.appointment_service import AppointmentService

class AppointmentCreationTest(TestCase):

    def setUp(self):
        self.barber = Barber.objects.create(
            first_name='Juan', last_name='González',
            phone='3001111111', specialty='Estilista'
        )
        self.service = Service.objects.create(
            name='Corte Básico', price=20000, duration_minutes=30
        )
        self.client = Client.objects.create(
            first_name='Pedro', last_name='Martínez', phone='3002222222'
        )

        BarberSchedule.objects.create(
            barber=self.barber,
            day_of_week=DayOfWeek.MONDAY,
            start_time=time(8, 0),
            end_time=time(18, 0)
        )
        self.appointment_service = AppointmentService()
        self.monday = date(2025, 1, 13)

    def test_create_appointment_success(self):
        
        appointment = self.appointment_service.create_appointment(
            client=self.client,
            barber=self.barber,
            service=self.service,
            appointment_date=self.monday,
            start_time=time(9, 0),
        )
        self.assertEqual(appointment.status, AppointmentStatus.PENDING)
        self.assertEqual(appointment.end_time, time(9, 30))
        self.assertEqual(appointment.barber, self.barber)
        self.assertEqual(appointment.client, self.client)

    def test_create_appointment_calculates_end_time(self):
        
        service_60 = Service.objects.create(
            name='Corte & Barba', price=28000, duration_minutes=60
        )
        appointment = self.appointment_service.create_appointment(
            client=self.client,
            barber=self.barber,
            service=service_60,
            appointment_date=self.monday,
            start_time=time(10, 0),
        )
        self.assertEqual(appointment.end_time, time(11, 0))

    def test_cannot_create_overlapping_appointment(self):
        
        self.appointment_service.create_appointment(
            client=self.client,
            barber=self.barber,
            service=self.service,
            appointment_date=self.monday,
            start_time=time(9, 0),
        )

        with self.assertRaises((AppointmentOverlapError, BarberNotAvailableError)):
            self.appointment_service.create_appointment(
                client=self.client,
                barber=self.barber,
                service=self.service,
                appointment_date=self.monday,
                start_time=time(9, 15),
            )

    def test_cannot_create_on_non_working_day(self):
        
        sunday = date(2025, 1, 19)
        with self.assertRaises(BarberNotAvailableError):
            self.appointment_service.create_appointment(
                client=self.client,
                barber=self.barber,
                service=self.service,
                appointment_date=sunday,
                start_time=time(9, 0),
            )

    def test_barber_agenda_returns_appointments(self):
        
        self.appointment_service.create_appointment(
            client=self.client,
            barber=self.barber,
            service=self.service,
            appointment_date=self.monday,
            start_time=time(9, 0),
        )
        agenda = AppointmentService.get_barber_agenda(self.barber, self.monday)
        self.assertEqual(len(agenda), 1)
        self.assertEqual(agenda[0].client, self.client)

    def test_barber_agenda_excludes_cancelled(self):
        
        appointment = self.appointment_service.create_appointment(
            client=self.client,
            barber=self.barber,
            service=self.service,
            appointment_date=self.monday,
            start_time=time(9, 0),
        )
        self.appointment_service.change_status(
            appointment, AppointmentStatus.CANCELLED
        )
        agenda = AppointmentService.get_barber_agenda(self.barber, self.monday)
        self.assertEqual(len(agenda), 0)
