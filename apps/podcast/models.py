import uuid
from django.db import models
from apps.api.models import User


class Podcast(models.Model):

    ACCEPTED_PODCAST_TYPES = (
        ("audio", "audio"),
        ("video", "video")
    )

    id = models.TextField(primary_key=True, default=uuid.uuid4)
    title = models.TextField(blank=False, null=False)
    podcast = models.TextField(blank=False, null=False)
    cover_image = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=255, default="audio", choices=ACCEPTED_PODCAST_TYPES)
    creation_time = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, default=0, related_name="podcast_likes")
    user_created = models.ForeignKey(User, on_delete=models.DO_NOTHING)
