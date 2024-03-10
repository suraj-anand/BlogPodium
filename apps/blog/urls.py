from django.urls import path
from . import views

urlpatterns = [
    path("", views.BlogAPI.as_view()),
    path("like/", views.LikeBlogAPI.as_view()),
    path("user-blogs/", views.UserBlogAPI.as_view()),
    path("<str:blog_id>/", views.SingleBlog.as_view())
]