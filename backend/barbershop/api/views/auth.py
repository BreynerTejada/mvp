from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


class AuthViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='me', url_name='me')
    def me(self, request):
        user = request.user

        role = 'admin' if user.is_staff else None
        barber_id = None
        client_id = None
        full_name = user.get_full_name() or user.username

        if hasattr(user, 'barber_profile') and user.barber_profile is not None:
            barber_id = user.barber_profile.id
            full_name = user.barber_profile.full_name
            if role is None:
                role = 'barber'

        if hasattr(user, 'client_profile') and user.client_profile is not None:
            client_id = user.client_profile.id
            if role is None:
                role = 'client'
                full_name = user.client_profile.full_name

        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'full_name': full_name,
            'role': role or 'guest',
            'is_staff': user.is_staff,
            'barber_id': barber_id,
            'client_id': client_id,
        })
