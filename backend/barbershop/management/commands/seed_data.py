from datetime import time
from django.core.management.base import BaseCommand

from django.contrib.auth.models import User
from barbershop.domain.models import Service, Barber, BarberSchedule
from barbershop.domain.enums import DayOfWeek

class Command(BaseCommand):
    help = 'Pobla la base de datos con datos iniciales para el MVP'

    def handle(self, *args, **options):
        if Service.objects.exists():
            self.stdout.write(self.style.WARNING('Datos ya existen. Omitiendo seed.'))
            return

        services = [
            Service(name='Corte Básico', price=20000, duration_minutes=20),
            Service(name='Corte & Barba', price=28000, duration_minutes=60),
            Service(name='Diseño de Barba', price=15000, duration_minutes=20),
        ]
        Service.objects.bulk_create(services)
        self.stdout.write(self.style.SUCCESS(f'✓ {len(services)} servicios creados'))

        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@barbershop.com', 'admin')
            self.stdout.write(self.style.SUCCESS(f'✓ Usuario admin creado (admin:admin)'))


        barbers_data = [
            {'first_name': 'Diego', 'last_name': 'Reyes', 'phone': '3001234567',
             'email': 'diego@barbershop.com', 'specialty': 'Master Barber'},
            {'first_name': 'Juan', 'last_name': 'González', 'phone': '3009876543',
             'email': 'juan@barbershop.com', 'specialty': 'Estilista'},
            {'first_name': 'Santiago', 'last_name': 'Pérez', 'phone': '3005551234',
             'email': 'santiago@barbershop.com', 'specialty': 'Senior Barber'},
        ]
        barbers = []
        for data in barbers_data:
            username = data['email'].split('@')[0]
            user = User.objects.create_user(username, data['email'], 'barber')
            
            barber = Barber.objects.create(user=user, **data)
            barbers.append(barber)
            
        self.stdout.write(self.style.SUCCESS(f'✓ {len(barbers)} barberos (con usuario) creados'))

        schedule_count = 0
        working_days = [
            DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY
        ]
        for barber in barbers:
            for day in working_days:
                BarberSchedule.objects.create(
                    barber=barber,
                    day_of_week=day,
                    start_time=time(8, 0),
                    end_time=time(18, 0)
                )
                schedule_count += 1
        self.stdout.write(self.style.SUCCESS(f'✓ {schedule_count} horarios creados'))
        self.stdout.write(self.style.SUCCESS('✓ Seed data completado'))
