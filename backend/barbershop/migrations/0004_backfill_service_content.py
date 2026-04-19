from django.db import migrations


def set_service_content(apps, schema_editor):
    Service = apps.get_model('barbershop', 'Service')

    Service.objects.filter(name='Corte Básico').update(
        description='Diseñado para resaltar un estilo natural. Un servicio preciso, limpio y profesional.',
        popularity_badge='',
    )
    Service.objects.filter(name='Corte & Barba').update(
        description='Corte a tu medida y barba perfectamente esculpida. Combinamos detalle y estilo para un look elegante.',
        popularity_badge='POPULAR',
    )
    Service.objects.filter(name='Diseño de Barba').update(
        description='Perfilado y diseño de barba con enfoque en simetría y elegancia. Un acabado limpio para complementar tu look.',
        popularity_badge='',
    )


def clear_service_content(apps, schema_editor):
    Service = apps.get_model('barbershop', 'Service')
    Service.objects.all().update(description='', popularity_badge='')


class Migration(migrations.Migration):

    dependencies = [
        ('barbershop', '0003_add_service_description_popularity'),
    ]

    operations = [
        migrations.RunPython(set_service_content, clear_service_content),
    ]
