from secrets import choice
from django.db import models
import string
import random


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Candidate.objects.filter(app_code=code).count() == 0:
            break
    return code

# Create your models here.
class Candidate(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    STATUS_CHOICES = [
        ('A', 'Accepted'),
        ('R', 'Rejected'),
        ('X', 'Applied'),
    ]
    app_code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    name = models.CharField(max_length=50, unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default="M")
    phone_number = models.IntegerField(null=True, default="12344567890")
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="X")
    created_at = models.DateTimeField(auto_now_add=True)

# Create your models here.
