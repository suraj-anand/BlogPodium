from django.urls import path, include
from . import views

urlpatterns = [
    path("auth-check/", views.AuthCheckAPI.as_view()),
    path("login/", views.LoginAPI.as_view()),
    path("register/", views.RegisterAPI.as_view()),
    path("logout/", views.LogoutAPI.as_view()),
    path("blog/", include("apps.blog.urls")),
    path("ping/", views.HeathCheck.as_view())
]