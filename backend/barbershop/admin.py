from django.contrib import admin
from barbershop.domain.models import (
    Service, Barber, BarberSchedule, Client, Appointment
)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'duration_minutes', 'is_active']
    list_filter = ['is_active']

class BarberScheduleInline(admin.TabularInline):
    model = BarberSchedule
    extra = 1

@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'phone', 'specialty', 'is_active']
    list_filter = ['is_active']
    inlines = [BarberScheduleInline]

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'phone', 'email']
    search_fields = ['first_name', 'last_name', 'phone']

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'client', 'barber', 'service', 'date', 'start_time', 'status']
    list_filter = ['status', 'date', 'barber']
    search_fields = ['client__first_name', 'client__last_name']
