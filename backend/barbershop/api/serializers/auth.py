from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from barbershop.domain.models import Client, Barber


class PhoneTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        identifier = attrs.get(self.username_field)
        resolved_username = self._resolve_username(identifier)
        if resolved_username is not None:
            attrs[self.username_field] = resolved_username
        return super().validate(attrs)

    @staticmethod
    def _resolve_username(identifier):
        if not identifier:
            return None

        client = Client.objects.filter(
            phone=identifier
        ).select_related('user').first()
        if client is not None and client.user is not None:
            return client.user.username

        barber = Barber.objects.filter(
            phone=identifier
        ).select_related('user').first()
        if barber is not None and barber.user is not None:
            return barber.user.username

        return None
