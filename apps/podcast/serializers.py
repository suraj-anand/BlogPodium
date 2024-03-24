from rest_framework.serializers import ModelSerializer
from .models import Podcast

class PodcastSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Podcast