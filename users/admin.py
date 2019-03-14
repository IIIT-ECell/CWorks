from django.contrib import admin

# Register your models here.
from .models import Job, Company, Student, CustomUser

admin.site.register(Job)
admin.site.register(Company)
admin.site.register(Student)
admin.site.register(CustomUser)
