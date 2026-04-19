from django.db import models
from django.core.validators import MinValueValidator


class Service(models.Model):

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, default='')
    popularity_badge = models.CharField(max_length=30, blank=True, default='')
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    duration_minutes = models.PositiveIntegerField(
        help_text="Duración del servicio en minutos",
        validators=[MinValueValidator(5)]
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['is_active'], name='idx_service_active'),
        ]

    def __str__(self):
        return f"{self.name} - ${self.price} ({self.duration_minutes} min)"
