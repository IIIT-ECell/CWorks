from django.urls import include, path
from rest_framework import routers

from .views import StudentViewSet, CompanyViewSet, CustomUserViewSet, JobViewSet, StudentListView
from .views import StudentAPI, CompanyAPI, CustomUserAPI, JobAPI

router = routers.DefaultRouter()
router.register('students', StudentViewSet)
router.register('companies', CompanyViewSet)
router.register('users', CustomUserViewSet)
router.register('jobs', JobViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('student/', StudentAPI.as_view()),
    path('company/', CompanyAPI.as_view()),
    path('user/', CustomUserAPI.as_view()),
    path('jobs/', JobAPI.as_view()),
    path('student/(?<user_id>.+)/$',StudentListView.as_view()),
]


