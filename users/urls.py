from django.urls import include, path
from rest_framework import routers

from .views import StudentViewSet, CompanyViewSet, CustomUserViewSet
from .views import StudentAPI, CompanyAPI, CustomUserAPI

router = routers.DefaultRouter()
router.register('students', StudentViewSet)
router.register('companies', CompanyViewSet)
router.register('users', CustomUserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('student/', StudentAPI.as_view()),
    path('company/', CompanyAPI.as_view()),
    path('user/', CustomUserAPI.as_view()),
]
