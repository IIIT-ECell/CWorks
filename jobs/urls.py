from django.urls import include, path
from rest_framework import routers

from .views import JobViewSet
from .views import JobAPI

router = routers.DefaultRouter()
router.register('jobs', JobViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('job/', JobAPI.as_view()),
]