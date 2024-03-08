from apps.api.models import User
from .models import Blog

def blob_parser(blogs, serializer_type="default"):
    data = []
    if serializer_type == "simple":
        for blog in blogs:
            user = User.objects.get(id=blog.get("user_created"))
            record = {
                "id": blog.get("id"),
                "creation_time": blog.get("creation_time"),
                "cover_image": blog.get("cover_image"),
                "title": blog.get("title"),
                "blog_owner": user.name,
                "profile": user.profile,
            }
            data.append(record)
    else:
        for blog in blogs:
            user = User.objects.get(id=blog.get("user_created"))
            record = {
                "id": blog.get("id"),
                "creation_time": blog.get("creation_time"),
                "cover_image": blog.get("cover_image"),
                "title": blog.get("title"),
                "content": blog.get("content"),
                "likes": blog.get("likes"),
                "blog_owner": user.name,
                "profile": user.profile,
            }
            data.append(record)
    return data