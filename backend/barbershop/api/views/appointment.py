from rest_framework import status as drf_status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from barbershop.domain.models import Barber, Service, Client, Appointment
from barbershop.domain.exceptions import BarberShopException
from barbershop.application.services.appointment_service import AppointmentService
from barbershop.api.serializers import (
    AppointmentReadSerializer,
    AppointmentCreateSerializer,
    AppointmentUpdateSerializer,
    AppointmentStatusSerializer,
)


class AppointmentViewSet(viewsets.ViewSet):

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def _filter_by_role(self, queryset, request):
        user = request.user
        if user.is_staff:
            return queryset
        if hasattr(user, 'barber_profile') and user.barber_profile is not None:
            return queryset.filter(barber=user.barber_profile)
        if hasattr(user, 'client_profile') and user.client_profile is not None:
            return queryset.filter(client=user.client_profile)
        return queryset.none()

    def list(self, request):
        queryset = Appointment.objects.select_related(
            'client', 'barber', 'service'
        ).all()

        queryset = self._filter_by_role(queryset, request)

        barber_id = request.query_params.get('barber_id')
        date = request.query_params.get('date')
        status_filter = request.query_params.get('status')

        if barber_id:
            queryset = queryset.filter(barber_id=barber_id)
        if date:
            queryset = queryset.filter(date=date)
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        queryset = queryset.order_by('-date', '-start_time')

        serializer = AppointmentReadSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        appointment = get_object_or_404(
            Appointment.objects.select_related('client', 'barber', 'service'),
            pk=pk,
        )
        return Response(AppointmentReadSerializer(appointment).data)

    def create(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        client = self._get_or_create_client(data)

        barber = Barber.objects.get(id=data['barber_id'])
        service = Service.objects.get(id=data['service_id'])

        try:
            appointment_service = AppointmentService()
            appointment = appointment_service.create_appointment(
                client=client,
                barber=barber,
                service=service,
                appointment_date=data['date'],
                start_time=data['start_time'],
                notes=data.get('notes', ''),
            )
        except BarberShopException as e:
            return Response({'error': str(e)}, status=drf_status.HTTP_400_BAD_REQUEST)

        return Response(
            AppointmentReadSerializer(appointment).data,
            status=drf_status.HTTP_201_CREATED
        )

    def update(self, request, pk=None):
        appointment = get_object_or_404(Appointment, pk=pk)
        if not request.user.is_staff:
            return Response(
                {'error': 'Solo administradores pueden editar citas.'},
                status=drf_status.HTTP_403_FORBIDDEN,
            )

        serializer = AppointmentUpdateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        for field in ['date', 'start_time', 'notes']:
            if field in data:
                setattr(appointment, field, data[field])

        if 'barber_id' in data:
            appointment.barber = Barber.objects.get(id=data['barber_id'])
        if 'service_id' in data:
            appointment.service = Service.objects.get(id=data['service_id'])

        if 'date' in data or 'start_time' in data or 'service_id' in data:
            from datetime import datetime, timedelta
            start_dt = datetime.combine(appointment.date, appointment.start_time)
            appointment.end_time = (
                start_dt + timedelta(minutes=appointment.service.duration_minutes)
            ).time()

        appointment.save()
        return Response(AppointmentReadSerializer(appointment).data)

    def destroy(self, request, pk=None):
        appointment = get_object_or_404(Appointment, pk=pk)
        if not request.user.is_staff:
            return Response(
                {'error': 'Solo administradores pueden eliminar citas.'},
                status=drf_status.HTTP_403_FORBIDDEN,
            )
        appointment.delete()
        return Response(status=drf_status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['patch'], url_path='status', url_name='status')
    def update_status(self, request, pk=None):
        appointment = get_object_or_404(Appointment, pk=pk)

        if not self._can_change_status(request.user, appointment):
            return Response(
                {'error': 'No tiene permisos para cambiar el estado de esta cita.'},
                status=drf_status.HTTP_403_FORBIDDEN,
            )

        serializer = AppointmentStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_status = serializer.validated_data['status']

        try:
            appointment_service = AppointmentService()
            appointment = appointment_service.change_status(appointment, new_status)
        except BarberShopException as e:
            return Response({'error': str(e)}, status=drf_status.HTTP_400_BAD_REQUEST)

        return Response(AppointmentReadSerializer(appointment).data)

    @action(detail=False, methods=['get'], url_path='mine', url_name='mine')
    def mine(self, request):
        user = request.user
        queryset = Appointment.objects.select_related(
            'client', 'barber', 'service'
        )

        if hasattr(user, 'client_profile') and user.client_profile is not None:
            queryset = queryset.filter(client=user.client_profile)
        elif hasattr(user, 'barber_profile') and user.barber_profile is not None:
            queryset = queryset.filter(barber=user.barber_profile)
        else:
            queryset = queryset.none()

        queryset = queryset.order_by('-date', '-start_time')
        serializer = AppointmentReadSerializer(queryset, many=True)
        return Response(serializer.data)

    @staticmethod
    def _can_change_status(user, appointment):
        if user.is_staff:
            return True
        barber_profile = getattr(user, 'barber_profile', None)
        if barber_profile is not None and barber_profile.id == appointment.barber_id:
            return True
        return False

    @staticmethod
    def _get_or_create_client(data):
        client = Client.objects.filter(phone=data['client_phone']).first()
        if client is not None:
            return client

        base_username = f"cliente_{data['client_phone']}"[:30]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            email=data.get('client_email', ''),
            password='cliente',
            first_name=data['client_first_name'],
            last_name=data['client_last_name'],
        )

        client = Client.objects.create(
            user=user,
            first_name=data['client_first_name'],
            last_name=data['client_last_name'],
            phone=data['client_phone'],
            email=data.get('client_email', ''),
        )
        return client
