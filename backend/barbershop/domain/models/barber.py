from django.db import models
from django.contrib.auth.models import User

from barbershop.domain.validators import phone_validator
from barbershop.domain.enums import DayOfWeek


class Barber(models.Model):

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='barber_profile'
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, validators=[phone_validator])
    email = models.EmailField(blank=True)
    specialty = models.CharField(
        max_length=100,
        blank=True,
        help_text="Ej: Master Barber, Estilista, Senior Barber"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['first_name', 'last_name']
        indexes = [
            models.Index(fields=['is_active'], name='idx_barber_active'),
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class BarberSchedule(models.Model):

    barber = models.ForeignKey(
        Barber,
        on_delete=models.CASCADE,
        related_name='schedules'
    )
    day_of_week = models.IntegerField(choices=DayOfWeek.choices)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        unique_together = ('barber', 'day_of_week')
        ordering = ['day_of_week', 'start_time']
        indexes = [
            models.Index(
                fields=['barber', 'day_of_week'],
                name='idx_schedule_barber_day'
            ),
        ]

    def __str__(self):
        day_name = DayOfWeek(self.day_of_week).label
        return (
            f"{self.barber} - {day_name}: "
            f"{self.start_time.strftime('%H:%M')} - {self.end_time.strftime('%H:%M')}"
        )

    def clean(self):
        from django.core.exceptions import ValidationError
        if self.start_time and self.end_time and self.start_time >= self.end_time:
            raise ValidationError("La hora de inicio debe ser anterior a la hora de fin.")
