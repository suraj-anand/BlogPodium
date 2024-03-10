import os
import uuid
import logging

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.utils.decorators import method_decorator
from django.core.files.storage import FileSystemStorage
from django.shortcuts import get_object_or_404
from django.db.models import Q

from apps.api.utils import authenticated_resource, parse_user_session
from apps.blog import COVER_IMAGE_PATH, COVER_IMAGE_STORE_PATH
from .helper import blob_parser, add_user_info_to_blog
from .models import Blog
from .serializers import BlogSerializer, SimpleBlogSerializer

DEFAULT_PAGE_SIZE = 10
# Create your views here.
class BlogAPI(APIView):
    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = request.query_params.get("page_size", DEFAULT_PAGE_SIZE)

        user_id = request.query_params.get("user_id", None)
        query = request.query_params.get("query")
        if user_id:
            qs = Blog.objects.filter(user_created=user_id).order_by("-creation_time")
        elif query:
            qs = Blog.objects.filter(Q(title__icontains=query) | Q(content__icontains=query))
        else:
            qs = Blog.objects.all().order_by("-creation_time")
        paginated_result = paginator.paginate_queryset(qs , request)
        data = SimpleBlogSerializer(paginated_result, many=True).data
        return paginator.get_paginated_response(blob_parser(data, serializer_type="simple"))

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
    


class SingleBlog(APIView):
    def get(self, request, blog_id):
        blog = get_object_or_404(Blog, id=blog_id)
        data = BlogSerializer(blog).data
        
        return Response(add_user_info_to_blog(blog=data, user_id=data.get("user_created")))


    @method_decorator(authenticated_resource)
    def patch(self, request, blog_id):
        
        title = request.data.get("title")
        content = request.data.get("content")

        user_data = parse_user_session(request)
        user_id = user_data.get("user_id")
        blog = Blog.objects.filter(id=blog_id)
        if len(blog) != 1:
            return Response({"detail": "Invalid blog id"}, status=status.HTTP_400_BAD_REQUEST)
        blog = blog[0]
        blog_data = BlogSerializer(blog).data
        
        if blog_data.get("user_created") != user_id:
            return Response({"detail": "You're not the owner for this blog"}, status=status.HTTP_400_BAD_REQUEST)
        
        blog.title = title
        blog.content = content
        blog.save()
        return Response({"detail": "Blog updated"}, status=status.HTTP_200_OK)
        


    @method_decorator(authenticated_resource)
    def delete(self, request, blog_id):
        try:
            user_data = parse_user_session(request)
            user_id = user_data.get("user_id")
            blog = Blog.objects.filter(id=blog_id)
            if len(blog) != 1:
                return Response({"detail": "Invalid blog id"}, status=status.HTTP_400_BAD_REQUEST)
            blog = blog[0]
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
        if not data:
            return Response([])
        return Response(blob_parser(blogs=data))