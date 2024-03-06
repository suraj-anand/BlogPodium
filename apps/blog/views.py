import os
import uuid
import logging

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.core.files.storage import FileSystemStorage
from django.shortcuts import get_object_or_404

from apps.api.utils import authenticated_resource, parse_user_session
from apps.blog import COVER_IMAGE_PATH, COVER_IMAGE_STORE_PATH
from .helper import blob_parser
from .models import Blog
from .serializers import BlogSerializer

# Create your views here.
class BlogAPI(APIView):
    def get(self, request):
        try:
            queryset = Blog.objects.all()
            data = BlogSerializer(queryset, many=True).data
            return Response(blob_parser(data))
        except Exception as err:
            logging.error(f"Error on fetching all the blogs")
            return Response({"detail": "Failed on fetching blogs"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    
    @method_decorator(authenticated_resource)
    def post(self, request):
        user_data = parse_user_session(request)
        id = f"{uuid.uuid4()}"
        user_id = user_data.get("user_id")
        content = request.data.get("content", "")
        title = request.data.get("title", "")
        cover_image = request.data.get("file")
        
        cover_image_path = ""
        if cover_image:
            fs = FileSystemStorage(location=os.path.join(COVER_IMAGE_STORE_PATH, id))
            filename = fs.save(cover_image.name, cover_image)
            cover_image_path = os.path.join(COVER_IMAGE_PATH, id, filename)
        
        data = {
            "id": id,
            "title": title,
            "content": content,
            "cover_image": cover_image_path,
            "user_created": user_id
        }
        serializer = BlogSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Published"}, status=201)
    
    
    def delete(self, request):
        try:
            user_data = parse_user_session(request)
            user_id = user_data.get("user_id")
            blog_id = request.query_params.get("blog_id")
            blog = get_object_or_404(Blog, id=blog_id)
            blog_data = BlogSerializer(blog).data
            
            if blog_data.get("user_created") != user_id:
                return Response({"detail": "You're not the owner for this blog"}, status=status.HTTP_400_BAD_REQUEST)
            
            blog.delete()
            return Response({"detail": "Blog Deleted"}, status=status.HTTP_204_NO_CONTENT)
        
        except Exception as err:
            logging.error(f"Error on blog deletion: {err}")
            return Response({"Error": f"{err}"})

class UserBlogAPI(APIView):
    @method_decorator(authenticated_resource)
    def get(self, request):
        user_data = parse_user_session(request)
        queryset = Blog.objects.filter(user_created=user_data.get("user_id"))
        data = BlogSerializer(queryset, many=True).data
        return Response(blob_parser(blogs=data))