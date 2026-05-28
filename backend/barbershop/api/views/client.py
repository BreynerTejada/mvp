from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from barbershop.domain.models import Client
from barbershop.api.serializers import ClientSerializer
from barbershop.api.permissions import IsAdminOrReadOnly


class ClientViewSet(viewsets.ModelViewSet):

    queryset = Client.objects.all().order_by('first_name', 'last_name')
    serializer_class = ClientSerializer
    pagination_class = None
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        data = serializer.validated_data
        base_username = (
            data.get('email', '').split('@')[0]
            if data.get('email')
            else f"cliente_{data['phone']}"
        )[:30]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            email=data.get('email', ''),
            password='cliente',
            first_name=data['first_name'],
            last_name=data['last_name'],
        )
        serializer.save(user=user)

    @action(
        detail=False,
        methods=['get'],
        url_path='me',
        permission_classes=[IsAuthenticated]
    )
    def me(self, request):
        client = getattr(request.user, 'client_profile', None)
        if client is None:
            return Response(
                {'error': 'No tiene un perfil de cliente.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response(ClientSerializer(client).data)
