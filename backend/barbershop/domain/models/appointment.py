from django.db import models

from barbershop.domain.enums import AppointmentStatus


class Appointment(models.Model):

    client = models.ForeignKey(
        'barbershop.Client',
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    barber = models.ForeignKey(
        'barbershop.Barber',
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    service = models.ForeignKey(
        'barbershop.Service',
        on_delete=models.PROTECT,
        related_name='appointments'
    )
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.CharField(
        max_length=20,
        choices=AppointmentStatus.choices,
        default=AppointmentStatus.PENDING
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date', 'start_time']
        indexes = [
            models.Index(
                fields=['barber', 'date', 'start_time'],
                name='idx_appt_barber_date_time'
            ),
            models.Index(fields=['status'], name='idx_appt_status'),
            models.Index(fields=['client', 'date'], name='idx_appt_client_date'),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=['barber', 'date', 'start_time'],
                name='uq_barber_date_starttime'
            ),
        ]

    def __str__(self):
        return (
            f"Cita con {self.barber.first_name} "
            f"({self.service.name}) {self.date} {self.start_time.strftime('%H:%M')}"
        )
