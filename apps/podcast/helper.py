from apps.api.models import User
from .models import Podcast

def podcast_parser(podcasts: iter, type="default"):
    data = []
    if type == "simple":
        for podcast in podcasts:
            data.append(podcast.get("id"))
    else:
        for podcast in podcasts:
            record = add_user_info_to_podcast(podcast, podcast.get("user_created"))
            data.append(record)
    return data

def add_user_info_to_podcast(podcast, user_id):
    user = User.objects.get(id=user_id)
    return {
        "id": podcast.get("id"),
        "creation_time": podcast.get("creation_time"),
        "cover_image": podcast.get("cover_image"),
        "podcast": podcast.get("podcast"),
        "title": podcast.get("title"),
        "likes": podcast.get("likes"),
        "type": podcast.get("type"),
        "user_id": user.id,
        "podcast_owner": user.name,
        "profile": user.profile,
    }