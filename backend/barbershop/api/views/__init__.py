from barbershop.api.views.service import ServiceViewSet
from barbershop.api.views.barber import BarberViewSet
from barbershop.api.views.client import ClientViewSet
from barbershop.api.views.appointment import AppointmentViewSet
from barbershop.api.views.auth import AuthViewSet

__all__ = [
    'ServiceViewSet',
    'BarberViewSet',
    'ClientViewSet',
    'AppointmentViewSet',
    'AuthViewSet',
]
