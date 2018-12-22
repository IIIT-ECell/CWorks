from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'name', 'age', 'school', 'location',
                  'bio', 'average_rating_given', 'average_rating_received')
