from rest_framework import viewsets

from barbershop.domain.models import Client
from barbershop.api.serializers import ClientSerializer


class ClientViewSet(viewsets.ModelViewSet):

    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    pagination_class = None
