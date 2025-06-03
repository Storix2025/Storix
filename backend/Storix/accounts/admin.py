from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import User, Warehouse, Video, Report


@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    model = User

    # Обновляем поля для отображения
    list_display = (
        'username', 'email', 'role', 'sysadmin',
        'is_staff', 'is_active'
    )

    # Обновляем fieldsets
    fieldsets = DefaultUserAdmin.fieldsets + (
        ('Доп. поля по роли', {
            'fields': ('role', 'sysadmin'),
        }),
    )

    # Для работников
    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        if obj and obj.role == User.ROLE_WORKER:
            fieldsets += (('Склады', {
                'fields': ('work_warehouses',)
            }),)
        return fieldsets


@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    list_display = ('name', 'admin')
    list_filter = ('admin',)


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'warehouse', 'created_by', 'upload_time')
    list_filter = ('warehouse',)


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'warehouse', 'created_by', 'discrepancies_count', 'created_at')
    list_filter = ('warehouse',)
