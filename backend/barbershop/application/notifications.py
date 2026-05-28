import logging
import os
import re
from urllib.parse import quote
from urllib.request import Request, urlopen
from urllib.error import URLError

from barbershop.application.observers import AppointmentObserver

logger = logging.getLogger(__name__)


class WhatsAppGateway:

    def send(self, phone: str, message: str) -> bool:
        raise NotImplementedError


class CallMeBotWhatsAppGateway(WhatsAppGateway):

    BASE_URL = "https://api.callmebot.com/whatsapp.php"

    def __init__(self, api_key: str, timeout_seconds: int = 5):
        self._api_key = api_key
        self._timeout = timeout_seconds

    def send(self, phone: str, message: str) -> bool:
        normalized_phone = self._normalize_phone(phone)
        url = (
            f"{self.BASE_URL}?"
            f"phone={normalized_phone}&"
            f"text={quote(message)}&"
            f"apikey={self._api_key}"
        )
        try:
            with urlopen(Request(url), timeout=self._timeout) as response:
                response.read()
            logger.info(f"[WHATSAPP] Mensaje enviado a {normalized_phone}")
            return True
        except URLError as exc:
            logger.warning(f"[WHATSAPP] Error enviando a {normalized_phone}: {exc}")
            return False

    @staticmethod
    def _normalize_phone(phone: str) -> str:
        digits = re.sub(r'\D', '', phone or '')
        if digits.startswith('57') or len(digits) >= 11:
            return digits
        return f"57{digits}"


class ConsoleWhatsAppGateway(WhatsAppGateway):

    def send(self, phone: str, message: str) -> bool:
        logger.info(f"[WHATSAPP-SIMULADO] -> {phone}\n{message}")
        return True


def build_whatsapp_gateway() -> WhatsAppGateway:
    api_key = os.environ.get('CALLMEBOT_API_KEY', '').strip()
    if api_key:
        return CallMeBotWhatsAppGateway(api_key=api_key)
    return ConsoleWhatsAppGateway()


class WhatsAppObserver(AppointmentObserver):

    STATUS_LABELS = {
        'PENDING': 'pendiente de confirmación',
        'CONFIRMED': 'confirmada',
        'COMPLETED': 'completada',
        'CANCELLED': 'cancelada',
    }

    def __init__(self, gateway: WhatsAppGateway = None):
        self._gateway = gateway or build_whatsapp_gateway()

    def on_appointment_created(self, appointment) -> None:
        message = self._build_created_message(appointment)
        if appointment.client.phone:
            self._gateway.send(appointment.client.phone, message)

    def on_appointment_status_changed(
        self, appointment, old_status: str, new_status: str
    ) -> None:
        if old_status == new_status:
            return

        message = self._build_status_message(appointment, new_status)
        if appointment.client.phone:
            self._gateway.send(appointment.client.phone, message)

    def _build_created_message(self, appointment) -> str:
        return (
            f"Hola {appointment.client.first_name}! "
            f"Tu cita en BarberShop fue registrada.\n"
            f"Barbero: {appointment.barber.full_name}\n"
            f"Servicio: {appointment.service.name}\n"
            f"Fecha: {appointment.date} a las "
            f"{appointment.start_time.strftime('%H:%M')}\n"
            f"Estado: pendiente de confirmación."
        )

    def _build_status_message(self, appointment, new_status: str) -> str:
        label = self.STATUS_LABELS.get(new_status, new_status.lower())
        return (
            f"Hola {appointment.client.first_name}! "
            f"Tu cita del {appointment.date} a las "
            f"{appointment.start_time.strftime('%H:%M')} "
            f"con {appointment.barber.full_name} "
            f"ahora está {label}."
        )
