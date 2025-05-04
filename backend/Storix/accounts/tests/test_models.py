from django.test import TestCase
from accounts.models import User, Warehouse, Video, Report

class ModelsTestCase(TestCase):
    def setUp(self):

        self.sysadmin = User.objects.create_user(
            username="sys", password="pass", role=User.ROLE_SYSADMIN,
            is_staff=True, is_superuser=True
        )

        self.admin = User.objects.create_user(
            username="adm", password="pass",
            role=User.ROLE_ADMIN, sysadmin=self.sysadmin
        )

        self.wh = Warehouse.objects.create(name="W1", admin=self.admin)

        self.worker = User.objects.create_user(
            username="wrk", password="pass",
            role=User.ROLE_WORKER, warehouse=self.wh
        )

    def test_warehouse_str(self):
        self.assertEqual(str(self.wh), "W1")

    def test_video_and_report_str(self):
        video = Video.objects.create(warehouse=self.wh, created_by=self.worker, file_path="f", video_data=b"")
        rpt = Report.objects.create(warehouse=self.wh, created_by=self.worker, discrepancies_count=0, file_data=b"")
        self.assertIn("Video", str(video))
        self.assertIn("Report", str(rpt))

    def test_relations(self):

        self.assertIn(self.wh, self.admin.warehouses.all())

        self.assertEqual(self.worker.warehouse, self.wh)
