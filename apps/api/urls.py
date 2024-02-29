from django.urls import path
from . import views

urlpatterns = [
    path("ping/", views.HeathCheck.as_view())
]