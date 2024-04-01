import os
import uuid
import logging
import bcrypt
import jwt

from django.http.response import FileResponse
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import User
from .serializers import UserSerializer, SimpleUserSerializer
from server.settings import JWT_SECRET, BASE_DIR, MEDIA_ROOT
from .utils import authenticated_resource, parse_user_session
from . import PROFILE_IMAGE_STORE_PATH, PROFILE_IMAGE_PATH

# Register Route
class RegisterAPI(APIView):
    def post(self, request):
        try:
            name = request.data.get("name")
            email = request.data.get("email")
            password = request.data.get("password")
            profile = request.data.get("file")
            
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
            
            # Profile image store
            profile_image_path = ""
            if profile:
                fs = FileSystemStorage(location=os.path.join(PROFILE_IMAGE_STORE_PATH, user_id))
                filename = fs.save(profile.name, profile)
                profile_image_path = os.path.join(PROFILE_IMAGE_PATH, user_id, filename)
            
            data = {
                "id": user_id,
                "name": name,
                "email": email,
                "password": hash,
                "profile": profile_image_path
            }
            serializer = UserSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            token = jwt.encode({"user_id": user_id, "user_name": name}, JWT_SECRET, algorithm="HS256")
            request.session["token"] = token
            return Response({"detail": "User Created", "user_name": name, "user_id": user_id}, status=status.HTTP_201_CREATED)
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
            
            token = jwt.encode({"user_id": user_id, "user_name": name}, JWT_SECRET, algorithm="HS256")
            request.session["token"] = token
            return Response({"detail": "Success", "user_name": name, "user_id": user_id}, status=status.HTTP_200_OK)
        
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
    def get(self, request):
        try:
            file = request.query_params.get("file")
            if not file:
                return Response({"detail": "file param is required"})
            file_path = os.path.join(BASE_DIR, MEDIA_ROOT, file)
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
        data = parse_user_session(request=request)
        print(data)
        return Response({"detail": "Authenticated", "user_id": data.get("user_id"), "user_name": data.get("user_name") }, status=status.HTTP_202_ACCEPTED)

# Edit profile Routes
class ChangeProfileAPI(APIView):
    @method_decorator(authenticated_resource)
    def post(self, request):
        data = parse_user_session(request=request)
        profile = request.data.get("file")
        user_id = data.get("user_id")
        
        # Store New profile
        new_profile_image_path = ""
        if profile:
            fs = FileSystemStorage(location=os.path.join(PROFILE_IMAGE_STORE_PATH, user_id))
            filename = fs.save(profile.name, profile)
            new_profile_image_path = os.path.join(PROFILE_IMAGE_PATH, user_id, filename)
            
        # Delete existing profile
        user = User.objects.get(id=user_id)
        old_profile_image_path = os.path.join(BASE_DIR, MEDIA_ROOT, user.profile)
        if os.path.exists(old_profile_image_path):
            os.remove(old_profile_image_path)

        # Update model with new profile image.
        user.profile = new_profile_image_path
        user.save()
        
        return Response( {"detail": "Updated" }, status=status.HTTP_200_OK)



class ChangePasswordAPI(APIView):
    @method_decorator(authenticated_resource)
    def post(self, request):
        data = parse_user_session(request=request)
        user_id = data.get("user_id")
        password = request.data.get("password")
        confirm_password = data.get("confirm_password")
        
        if password != confirm_password:
            return Response({"detail": "passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)
        
        # update password
        user = User.objects.get(id=user_id)
        salt = bcrypt.gensalt(10)
        hash = bcrypt.hashpw(password.encode(), salt=salt).decode()
        user.password = hash
        user.save()
        return Response( {"detail": "Updated" }, status=status.HTTP_200_OK)


# User Details
class UserDetails(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)        
        data = SimpleUserSerializer(user).data
        return Response(data)

# Health Check ROute
class HeathCheck(APIView):
    @method_decorator(authenticated_resource)
    def get(self, request):
        return Response({"message": "pong"})
