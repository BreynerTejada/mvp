from rest_framework import viewsets

from barbershop.domain.models import Service
from barbershop.api.serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):

    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    pagination_class = None
