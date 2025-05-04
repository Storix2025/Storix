import json
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage

from .models import InventoryReport
from .serializers import InventoryReportSerializer
from .utils import analyze_video_fast

class InventoryReportViewSet(viewsets.ModelViewSet):
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):

        return InventoryReport.objects.filter(worker=self.request.user)

    def perform_create(self, serializer):

        raw = self.request.data.get('config')
        config_data = {}
        if raw:

            if isinstance(raw, str):
                try:
                    config_data = json.loads(raw)
                except json.JSONDecodeError:
                    config_data = {}
            else:

                try:
                    config_data = json.load(raw)
                except Exception:
                    config_data = {}


        video_file = self.request.FILES.get('video')
        serializer.save(
            worker=self.request.user,
            video=video_file,
            config=config_data
        )

    @action(detail=True, methods=['post'], url_path='run')
    def run_analysis(self, request, pk=None):
        report = self.get_object()
        if report.status != 'pending':
            return Response({'detail': 'Анализ уже выполнен'},
                            status=status.HTTP_400_BAD_REQUEST)


        video_path = default_storage.path(report.video.name)

        pairs = report.config.get('pairs', [])
        result = analyze_video_fast(video_path, pairs)

        report.result = result
        report.status = 'done'
        report.save()

        return Response(InventoryReportSerializer(report).data,
                        status=status.HTTP_200_OK)