from django.urls import include, path
from rest_framework import routers

from .views import UserViewSet
from .views import UserAPI

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', UserAPI.as_view())
]
