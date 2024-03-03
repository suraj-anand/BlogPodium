import os
import uuid

from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.core.files.storage import FileSystemStorage

from apps.api.utils import authenticated_resource, parse_user_session
from apps.blog import COVER_IMAGE_DIR
from .models import Blog
from .serializers import BlogSerializer

# Create your views here.
class BlogAPI(APIView):
    def get(self, request):
        return Response()
    
    @method_decorator(authenticated_resource)
    def post(self, request):
        user_data = parse_user_session(request)
        user_id = user_data.get("user_id")
        content = request.data.get("content", "")
        title = request.data.get("title", "")
        cover_image = request.data.get("file")
        
        cover_img_path = ""
        if cover_image:
            fs = FileSystemStorage(location=os.path.join(COVER_IMAGE_DIR, f"{uuid.uuid4()}"))
            filename = fs.save(cover_image.name, cover_image)
            cover_img_path = os.path.join(COVER_IMAGE_DIR, f"{uuid.uuid4()}", filename)
        
        data = {
            "title": title,
            "content": content,
            "cover_image": cover_img_path,
            "user_created": user_id
        }
        serializer = BlogSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Published"}, status=201)
    
    
    #@method_decorator(authenticated_resource)

class UserBlogAPI(APIView):
    @method_decorator(authenticated_resource)
    def get(self, request):
        user_data = parse_user_session(request)
        queryset = Blog.objects.filter(user_created=user_data.get("user_id"))
        data = BlogSerializer(queryset, many=True).data
        return Response(data)