from django.urls import path
from . import views

urlpatterns = [
    path("", views.PodcastAPI.as_view()),
    path("like/", views.LikePodcastAPI.as_view()),
    path("user-podcasts/", views.UserPodcastAPI.as_view()),
    path("<str:podcast_id>/", views.SinglePodcast.as_view())
]