from rest_framework import serializers

from barbershop.domain.models import Service


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = [
            'id',
            'name',
            'description',
            'popularity_badge',
            'price',
            'duration_minutes',
            'is_active',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
