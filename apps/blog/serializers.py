from rest_framework.serializers import ModelSerializer
from .models import Blog

class BlogSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Blog

class SimpleBlogSerializer(ModelSerializer):
    class Meta:
        fields = ["id", "cover_image", "title", "user_created"]
        model = Blog