from django.contrib.auth.models import AbstractUser
from django.db import models
# from ratings.models import Ratings


class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    age = models.IntegerField(default=0)
    school = models.CharField(blank=True, max_length=255)
    location = models.CharField(blank=True, max_length=255)
    bio = models.CharField(blank=True, max_length=1023)

    average_rating_given = models.DecimalField(default=0.0, max_digits=2, decimal_places=2)
    average_rating_received = models.DecimalField(default=0.0, max_digits=2, decimal_places=2)

    def __str__(self):
        return self.email
