from django.db import models
from users.models import Company

# Create your models here.
class Job(models.Model):
    '''
    Stores all data of the Job. Many-one relation with Company
    Details:
        Type
        Description
        Duration
        Pay
        Vacancies
        (Skills)
        Apply by
        Start date
    Meta:
        Company ID
        About company(from relationship)

    '''

    INTERNSHIP = 'I'
    PROJECT = 'P'
    TYPE_OF_JOB = (
        (INTERNSHIP, 'Internship'),
        (PROJECT, 'Project'),
    )



    type_of = models.CharField(
        blank=False,
        max_length=1,
        choices=TYPE_OF_JOB,
    )

    description = models.CharField(blank=False, max_length=10000)
    
    # Assuming the duration is stored as plaintext
    duration = models.CharField(blank=False, max_length=20)

    # Another assumption on plaintext
    pay = models.CharField(blank=False, max_length=10)

    vacancies = models.PositiveIntegerField(blank=False)

    # TODO add skills

    apply_by = models.DateField(blank=False)
    start_date = models.DateField(blank=False)

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='jobs'
    )


