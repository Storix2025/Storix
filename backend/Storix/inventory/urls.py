from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryReportViewSet

router = DefaultRouter()
router.register(r'reports', InventoryReportViewSet, basename='inventory-report')

urlpatterns = [
    path('', include(router.urls)),
]