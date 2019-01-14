from rest_framework import viewsets, permissions, generics

from .models import Student, Company
from .serializers import StudentSerializer, CompanySerializer


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
