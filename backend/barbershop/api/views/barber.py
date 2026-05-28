from datetime import datetime

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from barbershop.api.permissions import IsAdminOrReadOnly
from barbershop.domain.models import Barber, BarberSchedule, Service
from barbershop.application.services.appointment_service import AppointmentService
from barbershop.api.serializers import (
    BarberSerializer,
    BarberListSerializer,
    BarberScheduleSerializer,
    AvailabilityQuerySerializer,
    ServiceSerializer,
    AppointmentReadSerializer,
)


class BarberViewSet(viewsets.ModelViewSet):

    queryset = Barber.objects.filter(is_active=True).prefetch_related('schedules')
    pagination_class = None
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        data = serializer.validated_data
        base_username = data['phone'][:30]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        password = data.pop('password')
        email = data.get('email', '')
        user = User.objects.create_user(username=username, email=email, password=password)
        serializer.save(user=user)

    def get_permissions(self):
        if self.action == 'schedules' and self.request.method == 'PUT':
            return [IsAuthenticated()]
        return [IsAdminOrReadOnly()]

    def get_serializer_class(self):
        if self.action == 'list':
            return BarberListSerializer
        return BarberSerializer

    @action(detail=True, methods=['get', 'post', 'put'], url_path='schedules')
    def schedules(self, request, pk=None):
        barber = self.get_object()

        if request.method == 'GET':
            schedules = BarberSchedule.objects.filter(barber=barber)
            serializer = BarberScheduleSerializer(schedules, many=True)
            return Response(serializer.data)

        if request.method == 'POST':
            serializer = BarberScheduleSerializer(data={**request.data, 'barber': barber.pk})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        is_own_barber = (
            hasattr(request.user, 'barber_profile')
            and request.user.barber_profile is not None
            and request.user.barber_profile.id == barber.id
        )
        if not request.user.is_staff and not is_own_barber:
            return Response(
                {'error': 'Sin permiso para modificar este horario.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        BarberSchedule.objects.filter(barber=barber).delete()
        created = []
        for item in request.data:
            serializer = BarberScheduleSerializer(data={**item, 'barber': barber.pk})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            created.append(serializer.data)
        return Response(created)

    @action(detail=True, methods=['get'], url_path='availability')
    def availability(self, request, pk=None):
        barber = self.get_object()
        query_serializer = AvailabilityQuerySerializer(data=request.query_params)
        query_serializer.is_valid(raise_exception=True)

        target_date = query_serializer.validated_data['date']
        service_id = query_serializer.validated_data['service_id']

        try:
            service = Service.objects.get(id=service_id, is_active=True)
        except Service.DoesNotExist:
            return Response(
                {'error': 'Servicio no encontrado.'},
                status=status.HTTP_404_NOT_FOUND
            )

        appointment_service = AppointmentService()
        slots = appointment_service.get_available_slots(
            barber=barber,
            target_date=target_date,
            duration_minutes=service.duration_minutes,
        )

        return Response({
            'barber': BarberListSerializer(barber).data,
            'date': target_date.isoformat(),
            'service': ServiceSerializer(service).data,
            'available_slots': slots,
        })

    @action(detail=True, methods=['get'], url_path='agenda', permission_classes=[IsAuthenticated])
    def agenda(self, request, pk=None):
        barber = self.get_object()

        if not request.user.is_staff:
            if getattr(request.user, 'barber_profile', None) is None or request.user.barber_profile.id != barber.id:
                return Response(
                    {'error': 'No tiene permisos para ver esta agenda.'},
                    status=status.HTTP_403_FORBIDDEN
                )

        date_str = request.query_params.get('date')

        if not date_str:
            target_date = datetime.now().date()
        else:
            try:
                target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            except ValueError:
                return Response(
                    {'error': 'Formato de fecha inválido. Use YYYY-MM-DD.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        appointments = AppointmentService.get_barber_agenda(barber, target_date)
        serializer = AppointmentReadSerializer(appointments, many=True)

        return Response({
            'barber': BarberListSerializer(barber).data,
            'date': target_date.isoformat(),
            'appointments': serializer.data,
        })
