from django.test import TestCase
from inventory.serializers import InventoryReportSerializer

class InventorySerializerTest(TestCase):
    def test_fields(self):
        s = InventoryReportSerializer()

        for f in ['id','worker','video','config','result','status','created_at']:
            self.assertIn(f, s.fields)
