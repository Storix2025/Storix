from rest_framework.test import APITestCase
from django.urls import reverse
from accounts.models import User, Warehouse

class AccountsAPITest(APITestCase):
    def setUp(self):

        self.sys = User.objects.create_user(
            username="sys", password="p", role=User.ROLE_SYSADMIN,
            is_staff=True, is_superuser=True
        )
        # login sysadmin
        resp = self.client.post(reverse('token_obtain_pair'),
                                {"username":"sys","password":"p"}, format='json')
        self.token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_sysadmin_can_create_admin(self):
        url = reverse('user-list')
        data = {"username":"adm1","email":"a@a.com","password":"p","role":User.ROLE_ADMIN}
        r = self.client.post(url, data, format='json')
        self.assertEqual(r.status_code, 201)
        adm = User.objects.get(username="adm1")
        self.assertEqual(adm.role, User.ROLE_ADMIN)
        self.assertEqual(adm.sysadmin, self.sys)

    def test_admin_cannot_create_admin(self):

        adm = User.objects.create_user(username="adm2", password="p", role=User.ROLE_ADMIN, sysadmin=self.sys)

        resp = self.client.post(reverse('token_obtain_pair'),
                                {"username":"adm2","password":"p"}, format='json')
        token2 = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token2)

        r = self.client.post(reverse('user-list'),
                             {"username":"nope","password":"p","role":User.ROLE_ADMIN}, format='json')
        self.assertEqual(r.status_code, 403)

    def test_admin_crud_warehouse_and_worker(self):

        adm = User.objects.create_user(username="adm3", password="p", role=User.ROLE_ADMIN, sysadmin=self.sys)
        tok = self.client.post(reverse('token_obtain_pair'),
                              {"username":"adm3","password":"p"}, format='json').data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + tok)


        r = self.client.post(reverse('warehouse-list'), {"name":"Wtest", "admin": adm.id,}, format='json')
        print(r.status_code, r.data)
        self.assertEqual(r.status_code, 201)
        wid = r.data['id']

        r2 = self.client.post(reverse('user-list'),
                              {"username":"wrk1","password":"p","role":User.ROLE_WORKER,"warehouse":wid},
                              format='json')
        print(r2.status_code, r2.data)
        self.assertEqual(r2.status_code, 201)
        wrk = User.objects.get(username="wrk1")
        self.assertEqual(wrk.warehouse_id, wid)
