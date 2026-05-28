from rest_framework import serializers

from barbershop.domain.models import Appointment
from barbershop.domain.enums import AppointmentStatus
from barbershop.api.serializers.client import ClientSerializer
from barbershop.api.serializers.barber import BarberListSerializer
from barbershop.api.serializers.service import ServiceSerializer


class AppointmentReadSerializer(serializers.ModelSerializer):

    client = ClientSerializer(read_only=True)
    barber = BarberListSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'client', 'barber', 'service',
            'date', 'start_time', 'end_time',
            'status', 'status_display', 'notes',
            'created_at', 'updated_at'
        ]


class AppointmentCreateSerializer(serializers.Serializer):

    client_first_name = serializers.CharField(max_length=100)
    client_last_name = serializers.CharField(max_length=100)
    client_phone = serializers.CharField(max_length=20)
    client_email = serializers.EmailField(required=False, allow_blank=True, default='')
    client_password = serializers.CharField(required=False, allow_blank=True, default='', write_only=True)
    barber_id = serializers.IntegerField()
    service_id = serializers.IntegerField()
    date = serializers.DateField()
    start_time = serializers.TimeField(format='%H:%M', input_formats=['%H:%M', '%H:%M:%S'])
    notes = serializers.CharField(required=False, allow_blank=True, default='')

    def validate_barber_id(self, value):
        from barbershop.domain.models import Barber
        if not Barber.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("Barbero no encontrado o inactivo.")
        return value

    def validate_service_id(self, value):
        from barbershop.domain.models import Service
        if not Service.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("Servicio no encontrado o inactivo.")
        return value


class AppointmentUpdateSerializer(serializers.Serializer):

    barber_id = serializers.IntegerField(required=False)
    service_id = serializers.IntegerField(required=False)
    date = serializers.DateField(required=False)
    start_time = serializers.TimeField(
        format='%H:%M', input_formats=['%H:%M', '%H:%M:%S'], required=False
    )
    notes = serializers.CharField(required=False, allow_blank=True)

    def validate_barber_id(self, value):
        from barbershop.domain.models import Barber
        if not Barber.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("Barbero no encontrado o inactivo.")
        return value

    def validate_service_id(self, value):
        from barbershop.domain.models import Service
        if not Service.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("Servicio no encontrado o inactivo.")
        return value


class AppointmentStatusSerializer(serializers.Serializer):

    status = serializers.ChoiceField(choices=AppointmentStatus.choices)
