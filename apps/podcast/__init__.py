import os
from server.settings import BASE_DIR, MEDIA_ROOT

COVER_IMAGE_PATH = os.path.join("podcasts", "cover-images")
COVER_IMAGE_STORE_PATH = os.path.join(BASE_DIR, MEDIA_ROOT, COVER_IMAGE_PATH)
os.makedirs(COVER_IMAGE_STORE_PATH, exist_ok=True)


PODCAST_PATH = os.path.join("podcasts", "podcast")
PODCAST_STORE_PATH = os.path.join(BASE_DIR, MEDIA_ROOT, PODCAST_PATH)
os.makedirs(PODCAST_STORE_PATH, exist_ok=True)