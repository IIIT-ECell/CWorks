from rest_framework import viewsets, permissions, generics

from .models import Job
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = JobSerializer

class JobAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = JobSerializer

    # TODO what
    def get_object(self):
        return self.request.user