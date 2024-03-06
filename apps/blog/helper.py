from apps.api.models import User
from .models import Blog

def blob_parser(blogs):
    data = []
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
        }
        data.append(record)
    return data