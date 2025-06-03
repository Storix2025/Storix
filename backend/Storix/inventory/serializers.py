from rest_framework import serializers
from .models import InventoryReport


class InventoryReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryReport
        fields = [
            'id', 'worker',
            'video', 'config',
            'result', 'status',
            'created_at'
        ]
        read_only_fields = [
            'id', 'worker', 'result',
            'status', 'created_at'
        ]
