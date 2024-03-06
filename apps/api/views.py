import os
import uuid
import logging
import bcrypt
import jwt

from django.http.response import FileResponse
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializer
from server.settings import JWT_SECRET, BASE_DIR, MEDIA_ROOT
from .utils import authenticated_resource

# Register Route
class RegisterAPI(APIView):
    def post(self, request):
        try:
            name = request.data.get("name")
            email = request.data.get("email")
            password = request.data.get("password")
            if not name or not email or not password:
                return Response(
                    {"detail": "Name, Email & Password is required"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if len(User.objects.filter(email=email)) != 0:
                return Response({"detail": "Email already taken"}, status=status.HTTP_400_BAD_REQUEST)

            user_id = f"{uuid.uuid4()}"
            salt = bcrypt.gensalt(10)
            hash = bcrypt.hashpw(password.encode(), salt=salt).decode()
            data = {
                "id": user_id,
                "name": name,
                "email": email,
                "password": hash
            }
            serializer = UserSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            token = jwt.encode({"user_id": user_id}, JWT_SECRET, algorithm="HS256")
            request.session["token"] = token
            return Response({"detail": "User Created", "name": name}, status=status.HTTP_201_CREATED)
        except Exception as err:
            logging.error(f"Failure on registering user..., Error: {err}")
            return Response(
                {"detail": "Failure on registering user", "error": f"{err}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# Login Route
class LoginAPI(APIView):
    def post(self, request):
        try:
            email = request.data.get("email")
            password = request.data.get("password")
            if not email or not password:
                return Response(
                    {"detail": "Email & Password is required"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            qs = User.objects.filter(email=email)
            if len(qs) != 1:
                return Response({"detail": "Invalid Email"}, status=status.HTTP_401_UNAUTHORIZED)
            
            user_data = qs.first()
            user_id = user_data.id
            name = user_data.name
            hash = user_data.password
            
            valid = bcrypt.checkpw(password.encode(), hash.encode())
            if not valid:
                return Response({"detail": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            
            token = jwt.encode({"user_id": user_id}, JWT_SECRET, algorithm="HS256")
            request.session["token"] = token
            return Response({"detail": "Success", "name": name}, status=status.HTTP_200_OK)
        
        except Exception as err:
            logging.error(f"Failure on user sign in, Error: {err}")
            return Response(
                {"detail": "Failure on user sign in", "error": f"{err}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# Logout Route
class LogoutAPI(APIView):
    def logout(self, request):
        if "token" in request.session:
            del request.session["token"]
        return Response({"detail": "Logged Out"}, status=status.HTTP_204_NO_CONTENT)
        
    def get(self, request):
        return self.logout(request)
    
    def post(self, request):
        return self.logout(request)


# Media Serve
class MediaServeAPI(APIView):
    def get(self, request, filename):
        try:
            file_path = os.path.join(BASE_DIR, MEDIA_ROOT, filename)
            if not os.path.exists(file_path):
                return Response({"detail": "File not found"}, status=status.HTTP_400_BAD_REQUEST)
            return FileResponse(open(file_path, "rb"))
        except Exception as err:
            logging.error(f"Error on media serve: {err}")
            return Response({"detail": "Unable to serve file"}, status=status.HTTP_400_BAD_REQUEST)

# Auth Check Route
class AuthCheckAPI(APIView):
    @method_decorator(authenticated_resource)
    def post(self, request):
        return Response({"detail": "Authenticated"}, status=status.HTTP_202_ACCEPTED)


# Health Check ROute
class HeathCheck(APIView):
    @method_decorator(authenticated_resource)
    def get(self, request):
        return Response({"message": "pong"})
