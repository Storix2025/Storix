from rest_framework.test import APIRequestFactory
from accounts.views import IsSysAdmin, IsAdmin, IsWorker
from accounts.models import User

factory = APIRequestFactory()

def make_user(role):
    return User(username=role, role=role)

def test_sysadmin_permission():
    user = make_user(User.ROLE_SYSADMIN)
    req = factory.get("/")
    req.user = user
    assert IsSysAdmin().has_permission(req, None)
    user.role = User.ROLE_WORKER
    assert not IsSysAdmin().has_permission(req, None)

def test_admin_permission():
    user = make_user(User.ROLE_ADMIN)
    req = factory.get("/")
    req.user = user
    assert IsAdmin().has_permission(req, None)
    user.role = User.ROLE_SYSADMIN
    assert not IsAdmin().has_permission(req, None)

def test_worker_permission():
    user = make_user(User.ROLE_WORKER)
    req = factory.get("/")
    req.user = user
    assert IsWorker().has_permission(req, None)
    user.role = User.ROLE_ADMIN
    assert not IsWorker().has_permission(req, None)
