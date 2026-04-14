from django.apps import AppConfig

class BarbershopConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'barbershop'

    def ready(self):

        from barbershop.application.observers import register_default_observers
        register_default_observers()
