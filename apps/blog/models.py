import uuid
from django.db import models
from apps.api.models import User


class Blog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    cover_image = models.TextField(blank=True, null=True)
    title = models.TextField(blank=False, null=False)
    content = models.TextField(null=True, blank=True)
    likes = models.ManyToManyField(User, default=0, related_name="blog_likes")
    user_created = models.ForeignKey(User, on_delete=models.DO_NOTHING)
