from django.urls import include, path
from .views import GoogleLogin

urlpatterns = [
    path('users/', include('users.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login')
]
url('students/(?P<user_id>.+)/$',StudentViewSet.as_view()),
