from datetime import date, time, timedelta

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

from barbershop.domain.models import (
    Service, Barber, BarberSchedule, Client, Appointment
)
from barbershop.domain.enums import DayOfWeek, AppointmentStatus


class Command(BaseCommand):
    help = 'Pobla la base de datos con datos iniciales para el MVP'

    def handle(self, *args, **options):
        if Service.objects.exists():
            self.stdout.write(self.style.WARNING('Datos ya existen. Omitiendo seed.'))
            return

        self._seed_services()
        self._seed_admin()
        barbers = self._seed_barbers()
        self._seed_schedules(barbers)
        clients = self._seed_clients()
        self._seed_appointments(barbers, clients)

        self.stdout.write(self.style.SUCCESS('Seed data completado'))

    def _seed_services(self):
        services = [
            Service(
                name='Corte Básico',
                description='Diseñado para resaltar un estilo natural. Un servicio preciso, limpio y profesional.',
                popularity_badge='',
                price=20000,
                duration_minutes=20,
            ),
            Service(
                name='Corte & Barba',
                description='Corte a tu medida y barba perfectamente esculpida. Combinamos detalle y estilo para un look elegante.',
                popularity_badge='POPULAR',
                price=28000,
                duration_minutes=60,
            ),
            Service(
                name='Diseño de Barba',
                description='Perfilado y diseño de barba con enfoque en simetría y elegancia. Un acabado limpio para complementar tu look.',
                popularity_badge='',
                price=15000,
                duration_minutes=20,
            ),
            Service(
                name='Skin Fade',
                description='Degradado a piel con precisión milimétrica. Para quienes buscan un look moderno y limpio.',
                popularity_badge='',
                price=25000,
                duration_minutes=30,
            ),
            Service(
                name='Classic Haircut',
                description='Corte clásico con tijera y máquina. Acabado tradicional con técnica profesional.',
                popularity_badge='',
                price=22000,
                duration_minutes=30,
            ),
            Service(
                name='The Full Package',
                description='Corte premium, barba, mascarilla facial y aplicación de tónico. La experiencia barber completa.',
                popularity_badge='PREMIUM',
                price=45000,
                duration_minutes=90,
            ),
        ]
        Service.objects.bulk_create(services)
        self.stdout.write(self.style.SUCCESS(f'{len(services)} servicios creados'))

    def _seed_admin(self):
        if User.objects.filter(username='admin').exists():
            return
        User.objects.create_superuser('admin', 'admin@barbershop.com', 'admin')
        self.stdout.write(self.style.SUCCESS('Admin creado (admin / admin)'))

    def _seed_barbers(self):
        barbers_data = [
            {
                'first_name': 'Marcus', 'last_name': 'Reed',
                'phone': '3001112222', 'email': 'marcus@barbershop.com',
                'specialty': 'Master Barber',
            },
            {
                'first_name': 'David', 'last_name': 'Chen',
                'phone': '3002223333', 'email': 'david@barbershop.com',
                'specialty': 'Senior Stylist',
            },
            {
                'first_name': 'James', 'last_name': 'Wilson',
                'phone': '3003334444', 'email': 'james@barbershop.com',
                'specialty': 'Barber',
            },
        ]
        barbers = []
        for data in barbers_data:
            username = data['phone']
            user = User.objects.create_user(
                username=username,
                email=data['email'],
                password='barber',
                first_name=data['first_name'],
                last_name=data['last_name'],
            )
            barber = Barber.objects.create(user=user, **data)
            barbers.append(barber)
        self.stdout.write(self.style.SUCCESS(f'{len(barbers)} barberos creados'))
        return barbers

    def _seed_schedules(self, barbers):
        working_days = [
            DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY
        ]
        count = 0
        for barber in barbers:
            for day in working_days:
                BarberSchedule.objects.create(
                    barber=barber,
                    day_of_week=day,
                    start_time=time(8, 0),
                    end_time=time(18, 0),
                )
                count += 1
        self.stdout.write(self.style.SUCCESS(f'{count} horarios creados'))

    def _seed_clients(self):
        clients_data = [
            {'first_name': 'Michael', 'last_name': 'Scott', 'phone': '3104441111', 'email': 'michael@dundermifflin.com'},
            {'first_name': 'Jim', 'last_name': 'Halpert', 'phone': '3104441112', 'email': 'jim@dundermifflin.com'},
            {'first_name': 'Dwight', 'last_name': 'Schrute', 'phone': '3104441113', 'email': 'dwight@dundermifflin.com'},
            {'first_name': 'Pam', 'last_name': 'Beesly', 'phone': '3104441114', 'email': 'pam@dundermifflin.com'},
            {'first_name': 'Ryan', 'last_name': 'Howard', 'phone': '3104441115', 'email': 'ryan@dundermifflin.com'},
            {'first_name': 'Andy', 'last_name': 'Bernard', 'phone': '3104441116', 'email': 'andy@dundermifflin.com'},
        ]
        clients = []
        for data in clients_data:
            username = data['phone']
            user = User.objects.create_user(
                username=username,
                email=data['email'],
                password='cliente',
                first_name=data['first_name'],
                last_name=data['last_name'],
            )
            client = Client.objects.create(user=user, **data)
            clients.append(client)
        self.stdout.write(self.style.SUCCESS(f'{len(clients)} clientes creados'))
        return clients

    def _seed_appointments(self, barbers, clients):
        services = list(Service.objects.all())
        today = date.today()

        plan = [
            (today, time(10, 0), clients[0], barbers[0], 'Classic Haircut', AppointmentStatus.CONFIRMED),
            (today, time(11, 30), clients[1], barbers[1], 'Corte Básico', AppointmentStatus.PENDING),
            (today + timedelta(days=1), time(14, 0), clients[2], barbers[0], 'The Full Package', AppointmentStatus.CONFIRMED),
            (today + timedelta(days=1), time(15, 15), clients[3], barbers[2], 'Corte Básico', AppointmentStatus.COMPLETED),
            (today + timedelta(days=2), time(9, 0), clients[4], barbers[0], 'Skin Fade', AppointmentStatus.PENDING),
            (today + timedelta(days=2), time(16, 0), clients[5], barbers[1], 'Corte & Barba', AppointmentStatus.CONFIRMED),
            (today - timedelta(days=7), time(10, 0), clients[0], barbers[0], 'Classic Haircut', AppointmentStatus.COMPLETED),
            (today - timedelta(days=14), time(11, 0), clients[2], barbers[0], 'The Full Package', AppointmentStatus.COMPLETED),
            (today - timedelta(days=21), time(15, 0), clients[3], barbers[2], 'Diseño de Barba', AppointmentStatus.COMPLETED),
        ]

        services_by_name = {s.name: s for s in services}
        count = 0
        for appt_date, start_time, client, barber, service_name, status in plan:
            service = services_by_name[service_name]
            from datetime import datetime as dt
            end_time = (dt.combine(appt_date, start_time) + timedelta(minutes=service.duration_minutes)).time()
            Appointment.objects.create(
                client=client,
                barber=barber,
                service=service,
                date=appt_date,
                start_time=start_time,
                end_time=end_time,
                status=status,
            )
            count += 1
        self.stdout.write(self.style.SUCCESS(f'{count} citas creadas'))
