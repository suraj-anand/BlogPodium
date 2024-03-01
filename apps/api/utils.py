import jwt
import logging
from server.settings import JWT_SECRET
from rest_framework.response import Response
from rest_framework import status

def authenticated_resource(func):
    def wrapper(*args, **kwargs):
        request = args[0];
        try:
            token = request.session.get("token")
            if not token:
                return Response({"detail": "Token missing"}, status=status.HTTP_400_BAD_REQUEST)
            
            user_data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            if isinstance(user_data, dict):
                return func(*args, **kwargs)
            else:
                return Response({"detail": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            logging.error(f"Exception on checking authenticated_resource, Error: {err}")
            return Response({"detail": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
    return wrapper