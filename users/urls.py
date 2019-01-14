from django.urls import include, path
from rest_framework import routers

from .views import StudentViewSet, CompanyViewSet
from .views import StudentAPI, CompanyAPI

router = routers.DefaultRouter()
router.register('students', StudentViewSet)
router.register('companies', CompanyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('student/', StudentAPI.as_view()),
    path('company/', CompanyAPI.as_view()),
]
