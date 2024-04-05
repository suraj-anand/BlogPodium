"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="BlogPodium API",
        default_version='v1',
        description="BlogPodium API Docs",
        contact=openapi.Contact(email="suraj02anand@gmail.com"),
    ),
    permission_classes=(permissions.AllowAny,),

)

class Home(TemplateView):
    template_name = "index.html"

urlpatterns = [
    path("", Home.as_view()),
    path('admin/', admin.site.urls),
    path("api/", include("apps.api.urls")),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='api-docs'),
]
