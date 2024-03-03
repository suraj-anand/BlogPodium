from django.urls import path
from . import views

urlpatterns = [
    path("", views.BlogAPI.as_view()),
    path("user-blogs/", views.UserBlogAPI.as_view())
]