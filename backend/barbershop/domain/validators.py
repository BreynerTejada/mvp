from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^\+?\d{7,15}$',
    message="Formato de teléfono inválido. Use entre 7 y 15 dígitos."
)
