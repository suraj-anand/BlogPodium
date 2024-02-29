from django.db import models

# Create your models here.
class User(models.Model):
    id = models.TextField(primary_key=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True, null=False, blank=False)
    password = models.TextField(blank=False, null=False)
