from django.test import TestCase
from inventory.models import InventoryReport
from accounts.models import User

class InventoryModelsTest(TestCase):
    def setUp(self):
        self.worker = User.objects.create_user(username="w", password="p", role=User.ROLE_WORKER)
    def test_create(self):
        rpt = InventoryReport.objects.create(worker=self.worker, video="f.mp4", config={})
        self.assertEqual(rpt.status, 'pending')
        self.assertIsNone(rpt.result)
