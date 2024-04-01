from django.urls import path, include
from . import views

urlpatterns = [
    path("auth-check/", views.AuthCheckAPI.as_view()),
    path("login/", views.LoginAPI.as_view()),
    path("register/", views.RegisterAPI.as_view()),
    path("update-profile/", views.ChangeProfileAPI.as_view()),
    path("update-password/", views.ChangePasswordAPI.as_view()),
    path("user/<str:user_id>", views.UserDetails.as_view()),
    path("logout/", views.LogoutAPI.as_view()),
    path("media/", views.MediaServeAPI.as_view()),
    path("blog/", include("apps.blog.urls")), # Blog App
    path("podcast/", include("apps.podcast.urls")), # Podcast App
    path("ping/", views.HeathCheck.as_view())
]