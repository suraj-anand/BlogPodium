from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from apps.api.utils import authenticated_resource, parse_user_session

from .models import Blog
from .serializers import BlogSerializer

# Create your views here.
class BlogAPI(APIView):
    def get(self, request):
        return Response()
    
    @method_decorator(authenticated_resource)
    def post(self, request):
        user_data = parse_user_session(request)
        user_id = user_data.get("user_id")
        content = request.data.get("content")
        
        # Filestore
        # cover_image = req
        
    
    
    #@method_decorator(authenticated_resource)

class UserBlogAPI(APIView):
    @method_decorator(authenticated_resource)
    def get(self, request):
        user_data = parse_user_session(request)
        queryset = Blog.objects.filter(user_created=user_data.get("user_id"))
        data = BlogSerializer(queryset, many=True).data
        return Response(data)