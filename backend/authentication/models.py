from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):

    email = models.EmailField(unique=True, max_length=255)
    
    ROLE_CHOICES = (
        ('admin', 'Admin/Owner'),
        ('manager', 'Manager'),
        ('staff', 'Kitchen Staff'),
    )
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='manager')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email