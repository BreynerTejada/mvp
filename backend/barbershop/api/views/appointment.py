from rest_framework import status as drf_status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from barbershop.domain.models import Barber, Service, Client, Appointment
from barbershop.domain.exceptions import BarberShopException
from barbershop.application.services.appointment_service import AppointmentService
from barbershop.api.serializers import (
    AppointmentReadSerializer,
    AppointmentCreateSerializer,
    AppointmentStatusSerializer,
)


class AppointmentViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Appointment.objects.select_related(
            'client', 'barber', 'service'
        ).all()

        barber_id = request.query_params.get('barber_id')
        date = request.query_params.get('date')
        status_filter = request.query_params.get('status')

        if barber_id:
            queryset = queryset.filter(barber_id=barber_id)
        if date:
            queryset = queryset.filter(date=date)
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        serializer = AppointmentReadSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = AppointmentCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        client, _ = Client.objects.get_or_create(
            phone=data['client_phone'],
            defaults={
                'first_name': data['client_first_name'],
                'last_name': data['client_last_name'],
                'email': data.get('client_email', ''),
            }
        )

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


    @action(detail=True, methods=['patch'], url_path='status', url_name='status')
    def update_status(self, request, pk=None):
        appointment = get_object_or_404(Appointment, pk=pk)

        serializer = AppointmentStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_status = serializer.validated_data['status']

        try:
            appointment_service = AppointmentService()
            appointment = appointment_service.change_status(appointment, new_status)
        except BarberShopException as e:
            return Response({'error': str(e)}, status=drf_status.HTTP_400_BAD_REQUEST)

        return Response(AppointmentReadSerializer(appointment).data)
