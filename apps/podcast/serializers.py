from rest_framework.serializers import ModelSerializer
from .models import Podcast

class PodcastSerializer(ModelSerializer):
    class Meta:
        fields = ["id", "title", "podcast", "cover_image", "type", "creation_time", "user_created"]
        model = Podcast