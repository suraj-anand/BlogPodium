from django.urls import path
from . import views

urlpatterns = [
    path("user-blogs/", views.UserBlogAPI.as_view())
]