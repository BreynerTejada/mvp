from django.urls import path, include
from rest_framework.routers import DefaultRouter

from barbershop.api.views import (
    ServiceViewSet,
    BarberViewSet,
    ClientViewSet,
    AppointmentViewSet,
    AuthViewSet,
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'barbers', BarberViewSet, basename='barber')
router.register(r'clients', ClientViewSet, basename='client')

urlpatterns = [
    path('', include(router.urls)),
    path(
        'appointments/',
        AppointmentViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='appointment-list-create'
    ),
    path(
        'appointments/<int:pk>/status/',
        AppointmentViewSet.as_view({'patch': 'update_status'}),
        name='appointment-status'
    ),
    path('auth/me/', AuthViewSet.as_view({'get': 'me'}), name='auth-me'),
]
