from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


class AuthViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='me', url_name='me')
    def me(self, request):
        user = request.user
        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'barber_id': None
        }
        if hasattr(user, 'barber_profile'):
            data['barber_id'] = user.barber_profile.id
        return Response(data)
