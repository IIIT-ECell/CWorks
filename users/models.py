'''
Model description for Student and Company users. The users are an extension of
Django's default AbstractUser so as to further use built in features available
through the framework.
Generic workflow used: https://simpleisbetterthancomplex.com/tutorial/2018/01/18/how-to-implement-multiple-user-types-with-django.html
'''

from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    '''
    Model that handles authentication.
    Setup defaults applicable to both Students and Company.
    '''

    # Set user type at initialisation, somehow
    USER_TYPE_CHOICES = (
        (1, 'Student'),
        (2, 'Company'),
        (3, 'Admin'),
    )
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)

    name = models.CharField(blank=False, max_length=255, default='')
    phone_number = models.CharField(blank=False, max_length=10, default='')

    def __str__(self):
        return self.email


class Student(models.Model):
    '''
    Definition of the student, containing
    Personal details:
        Name, DOB, ID, Year of study (to be updated yearly), *Permanent City
        of Residence, Phone, Email, Nationality, Gender
    Others:
        Skills
        Projects
    Available to all:
        Name, *Email, *Age, Skills, *Projects, Year of Study
    Available to Company accounts to which Applications have been made
        Name, Email, Phone, Age, Skills, Projects, Year of Study, Permanent
        City of Residence, *Nationality
    To be added:
        Rating/Comments by Company
    '''

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    # Defining choices for Gender and Year of Study
    # TODO: Consider separating out?
    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'
    NOT_SAY = 'N'
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
        (NOT_SAY, 'Prefer not to say'),
    )

    Y1 = '1'
    Y2 = '2'
    Y3 = '3'
    Y4 = '4'
    Y5 = '5'

    YEAR_OF_STUDY_CHOICES = (
        (Y1, 'First Year Undergrad'),
        (Y2, 'Second Year Undergrad'),
        (Y3, 'Third Year Undergrad'),
        (Y4, 'Fourth Year Undergrad'),
        (Y5, 'Postgrads (5th year DD, PG+))'),
    )


    # name = models.CharField(blank=False, max_length=255)
    # TODO Store DOB
    student_id = models.CharField(blank=False, max_length=10)
    # phone_number = models.CharField(blank=False, max_length=10)

    gender = models.CharField(
        blank=False,
        max_length=2,
        choices=GENDER_CHOICES,
    )
    year_of_study = models.CharField(
        blank=False,
        max_length=1,
        choices=YEAR_OF_STUDY_CHOICES,
    )

    permanent_city_res = models.CharField(blank=True, max_length=100)
    nationality = models.CharField(blank=True, max_length=100)

    def __str__(self):
        return self.email


class Company(models.Model):
    '''
    Definition of the company, containing
        Company name
        Company ID
        About Company
        Email
        Phone Number
    '''

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    name = models.CharField(blank=False, max_length=255, default="")
    company_id = models.CharField(blank=False, max_length=255)
    about = models.CharField(blank=False, max_length=10000)
    # phone_number = models.CharField(blank=False, max_length=10)

    additional_poc = models.CharField(blank=True, max_length=512)

    def __str__(self):
        return self.company_id

class Job(models.Model):
    """ 
    Class Jobs containing information regarding each job
        Job name
        Company ID
        Description
        Skill
        Job Start Date
        Job Duration
        Stipend
        Language
        Category - Internship/Project
        Payment
    """
    job_name = models.CharField(blank=False,max_length=255)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    description = models.TextField(blank=False)
    skill = models.CharField(max_length=50)
    job_start_date = models.DateField()
    job_duration = models.IntegerField()
    stipend = models.IntegerField()
    language = models.CharField(max_length=50)
    category = models.CharField(max_length=10)
    def __str__(self):
        return self.job_name

