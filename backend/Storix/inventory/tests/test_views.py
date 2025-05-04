from rest_framework.test import APITestCase
from django.urls import reverse
from accounts.models import User, Warehouse
from inventory.models import InventoryReport
import io
from django.core.files.uploadedfile import SimpleUploadedFile

class InventoryAPITest(APITestCase):
    def setUp(self):

        sys = User.objects.create_user(username="sys", password="p", role=User.ROLE_SYSADMIN, is_staff=True, is_superuser=True)
        adm = User.objects.create_user(username="adm", password="p", role=User.ROLE_ADMIN, sysadmin=sys)
        wh = Warehouse.objects.create(name="W", admin=adm)
        self.worker = User.objects.create_user(username="w", password="p", role=User.ROLE_WORKER, warehouse=wh)
        tok = self.client.post(reverse('token_obtain_pair'),
                               {"username":"w","password":"p"}, format='json').data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + tok)
    def test_worker_can_create_and_run_report(self):
        url = reverse('inventory-report-list')

        video = SimpleUploadedFile("v.mp4", b"0000", content_type="video/mp4")
        config = SimpleUploadedFile("c.json", b'{"pairs":[]}', content_type="application/json")
        resp = self.client.post(url, {'video': video, 'config': '{"pairs":[]}'} )
        self.assertEqual(resp.status_code, 201)
        rid = resp.data['id']

        run_url = reverse('inventory-report-run-analysis', args=[rid])
        r2 = self.client.post(run_url)
        self.assertEqual(r2.status_code, 200)
        self.assertIn('status', r2.data)
