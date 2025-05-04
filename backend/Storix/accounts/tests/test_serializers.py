from django.test import TestCase
from accounts.serializers import UserSerializer
from accounts.models import User

class UserSerializerTest(TestCase):
    def test_create_sets_password(self):
        data = {
            "username": "u1", "email": "e@e.com",
            "password": "plain", "role": User.ROLE_WORKER
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        # пароль в базе захэширован, не равен plain
        self.assertNotEqual(user.password, "plain")
        self.assertTrue(user.check_password("plain"))
