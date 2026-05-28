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

appointment_collection = AppointmentViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
appointment_detail = AppointmentViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'update',
    'delete': 'destroy',
})

urlpatterns = [
    path('', include(router.urls)),
    path('appointments/', appointment_collection, name='appointment-list-create'),
    path(
        'appointments/mine/',
        AppointmentViewSet.as_view({'get': 'mine'}),
        name='appointment-mine'
    ),
    path('appointments/<int:pk>/', appointment_detail, name='appointment-detail'),
    path(
        'appointments/<int:pk>/status/',
        AppointmentViewSet.as_view({'patch': 'update_status'}),
        name='appointment-status'
    ),
    path('auth/me/', AuthViewSet.as_view({'get': 'me'}), name='auth-me'),
]
