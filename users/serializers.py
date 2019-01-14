from rest_framework import serializers
from .models import Student, Company


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        # fields = ('email', 'username', 'name', 'age', 'school', 'location',
                  # 'bio', 'average_rating_given', 'average_rating_received')
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
