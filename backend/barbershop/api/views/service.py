from rest_framework import viewsets

from barbershop.domain.models import Service
from barbershop.api.serializers import ServiceSerializer
from barbershop.api.permissions import IsAdminOrReadOnly


class ServiceViewSet(viewsets.ModelViewSet):

    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    pagination_class = None
    permission_classes = [IsAdminOrReadOnly]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
