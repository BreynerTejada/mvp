from rest_framework import serializers

from barbershop.domain.models import Barber, BarberSchedule


class BarberScheduleSerializer(serializers.ModelSerializer):

    day_of_week_display = serializers.CharField(source='get_day_of_week_display', read_only=True)

    class Meta:
        model = BarberSchedule
        fields = ['id', 'barber', 'day_of_week', 'day_of_week_display', 'start_time', 'end_time']
        read_only_fields = ['id']


class BarberSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(read_only=True)
    schedules = BarberScheduleSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = Barber
        fields = [
            'id', 'first_name', 'last_name', 'full_name',
            'phone', 'email', 'specialty', 'is_active',
            'schedules', 'created_at', 'password'
        ]
        read_only_fields = ['id', 'created_at', 'full_name']


class BarberListSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = Barber
        fields = ['id', 'first_name', 'last_name', 'full_name', 'specialty', 'is_active']


class AvailabilityQuerySerializer(serializers.Serializer):

    date = serializers.DateField()
    service_id = serializers.IntegerField()
