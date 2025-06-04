from django.db import models
from django.conf import settings


class InventoryReport(models.Model):
    worker = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'worker'},
        related_name='inventory_reports'
    )
    video = models.FileField(upload_to='inventory/videos/')
    config = models.JSONField()
    result = models.JSONField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('done', 'Done')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"InvReport #{self.pk} by {self.worker}"
