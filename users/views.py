from rest_framework import viewsets, permissions, generics

from .models import Student, Company, CustomUser , Job
from .serializers import StudentSerializer, CompanySerializer, CustomUserSerializer, JobSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CustomUserSerializer


class CustomUserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = StudentSerializer


class StudentAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = StudentSerializer

    def get_object(self):
        return self.request.user


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CompanySerializer


class CompanyAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = CompanySerializer

    def get_object(self):
        return self.request.user

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = JobSerializer

class JobAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = JobSerializer

    def get_object(self):
        return self.request.user
    
class StudentListView(generics.ListAPIView):
    serializer_class = StudentSerializer
    def get_student(self):
        """

        """
        user_id = self.kwargs['user_id']
        return Student.objects.filter(user_id=user_id)