from django.db import models


class AppointmentStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pendiente'
    CONFIRMED = 'CONFIRMED', 'Confirmada'
    COMPLETED = 'COMPLETED', 'Completada'
    CANCELLED = 'CANCELLED', 'Cancelada'


class DayOfWeek(models.IntegerChoices):
    MONDAY = 1, 'Lunes'
    TUESDAY = 2, 'Martes'
    WEDNESDAY = 3, 'Miércoles'
    THURSDAY = 4, 'Jueves'
    FRIDAY = 5, 'Viernes'
    SATURDAY = 6, 'Sábado'
    SUNDAY = 7, 'Domingo'
