from rest_framework import serializers
from .models import User, Warehouse, Video, Report


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    work_warehouses = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Warehouse.objects.all(),
        required=False,
    )

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password',
            'role', 'sysadmin', 'work_warehouses'
        ]

    def create(self, validated_data):
        work_warehouses_data = validated_data.pop('work_warehouses', [])
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        user.work_warehouses.set(work_warehouses_data)
        return user

    def update(self, instance, validated_data):
        work_warehouses_data = validated_data.pop('work_warehouses', None)
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)
        instance.save()

        if work_warehouses_data is not None:
            instance.work_warehouses.set(work_warehouses_data)

        return instance


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['id', 'name', 'admin']
        read_only_fields = ['id']


class VideoSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'warehouse', 'created_by', 'file_path', 'upload_time']
        read_only_fields = ['id', 'created_by', 'upload_time']


class ReportSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'warehouse', 'created_by', 'discrepancies_count', 'created_at']
        read_only_fields = ['id', 'created_by', 'created_at']
