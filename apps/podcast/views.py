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
from apps.podcast import COVER_IMAGE_PATH, COVER_IMAGE_STORE_PATH ,PODCAST_PATH, PODCAST_STORE_PATH
from .helper import podcast_parser, add_user_info_to_podcast
from .models import Podcast
from apps.api.models import User
from .serializers import PodcastSerializer

DEFAULT_PAGE_SIZE = 4
# Create your views here.
class PodcastAPI(APIView):
    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = request.query_params.get("page_size", DEFAULT_PAGE_SIZE)

        user_id = request.query_params.get("user_id", None)
        query = request.query_params.get("query")
        type = request.query_params.get("type")
        if user_id:
            qs = Podcast.objects.filter(user_created=user_id).order_by("-creation_time")
        elif query:
            qs = Podcast.objects.filter(Q(title__icontains=query.strip()))
        else:
            qs = Podcast.objects.all().order_by("-creation_time")
        paginated_result = paginator.paginate_queryset(qs , request)
        data = PodcastSerializer(paginated_result, many=True).data
        return paginator.get_paginated_response(podcast_parser(data, type))

    @method_decorator(authenticated_resource)
    def post(self, request):
        user_data = parse_user_session(request)
        id = f"{uuid.uuid4()}"
        user_id = user_data.get("user_id")
        type = request.data.get("type")
        title = request.data.get("title", "")
        cover_image = request.data.get("cover_image")
        podcast = request.data.get("podcast")
        
        if not podcast or not type:
            return Response({"detail": "type, podcast is required"}, status=401)

        cover_image_path = ""
        if cover_image:
            fs = FileSystemStorage(location=os.path.join(COVER_IMAGE_STORE_PATH, id))
            filename = fs.save(cover_image.name, cover_image)
            cover_image_path = os.path.join(COVER_IMAGE_PATH, id, filename)

        podcast_path = ""
        fs = FileSystemStorage(location=os.path.join(PODCAST_STORE_PATH, id))
        filename = fs.save(podcast.name, podcast)
        podcast_path = os.path.join(PODCAST_PATH, id, filename)

        data = {
            "id": id,
            "title": title,
            "type": type,
            "podcast": podcast_path,
            "cover_image": cover_image_path,
            "user_created": user_id
        }
        serializer = PodcastSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Published"}, status=201)
    


class SinglePodcast(APIView):
    def get(self, request, podcast_id):
        podcast = get_object_or_404(Podcast, id=podcast_id)
        data = PodcastSerializer(podcast).data
        return Response(add_user_info_to_podcast(podcast=data, user_id=data.get("user_created")))


    @method_decorator(authenticated_resource)
    def patch(self, request, podcast_id):
        
        title = request.data.get("title")

        user_data = parse_user_session(request)
        user_id = user_data.get("user_id")
        podcast = Podcast.objects.filter(id=podcast_id)
        if len(podcast) != 1:
            return Response({"detail": "Invalid podcast id"}, status=status.HTTP_400_BAD_REQUEST)
        podcast = podcast[0]
        podcast_data = PodcastSerializer(podcast).data
        
        if podcast_data.get("user_created") != user_id:
            return Response({"detail": "You're not the owner for this podcast"}, status=status.HTTP_400_BAD_REQUEST)
        
        podcast.title = title
        podcast.save()
        return Response({"detail": "Blog updated"}, status=status.HTTP_200_OK)
        


    @method_decorator(authenticated_resource)
    def delete(self, request, podcast_id):
        try:
            user_data = parse_user_session(request)
            user_id = user_data.get("user_id")
            podcast = Podcast.objects.filter(id=podcast_id)
            if len(podcast) != 1:
                return Response({"detail": "Invalid podcast id"}, status=status.HTTP_400_BAD_REQUEST)
            podcast = podcast[0]
            podcast_data = PodcastSerializer(podcast).data
            
            if podcast_data.get("user_created") != user_id:
                return Response({"detail": "You're not the owner for this podcast"}, status=status.HTTP_400_BAD_REQUEST)
            
            podcast.delete()
            return Response({"detail": "Podcast Deleted"}, status=status.HTTP_204_NO_CONTENT)
        
        except Exception as err:
            logging.error(f"Error on podcast deletion: {err}")
            return Response({"Error": f"{err}"})


class LikePodcastAPI(APIView):
    
    @method_decorator(authenticated_resource)
    def get(self, request):
        user_data = parse_user_session(request)
        user_id = user_data.get("user_id")
        user = User.objects.get(id=user_id)
        podcasts = user.podcast_likes.all()
        data = PodcastSerializer(podcasts, many=True).data
        return Response(podcast_parser(data), status=200)
    
    @method_decorator(authenticated_resource)
    def post(self, request):
        user_data = parse_user_session(request)
        user_id = user_data.get("user_id")
        podcast_id = request.data.get("podcast_id")
        action = request.data.get("action", "like")

        podcast = Podcast.objects.filter(id=podcast_id)
        if len(podcast) != 1:
            return Response({"detail": "Invalid blog id"}, status=status.HTTP_400_BAD_REQUEST)
        podcast = podcast[0]

        if action.lower() == "unlike":
            podcast.likes.remove(user_id)
        else:
            podcast.likes.add(user_id)
            podcast.save()

        return Response({"detail": "done"}, status=status.HTTP_201_CREATED)



class UserPodcastAPI(APIView):
    @method_decorator(authenticated_resource)
    def get(self, request):
        user_data = parse_user_session(request)
        queryset = Podcast.objects.filter(user_created=user_data.get("user_id"))
        data = PodcastSerializer(queryset, many=True).data
        if not data:
            return Response([])
        return Response(podcast_parser(podcasts=data))