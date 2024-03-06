import os
from server.settings import BASE_DIR, MEDIA_ROOT

COVER_IMAGE_PATH = os.path.join("blog", "cover-images")
COVER_IMAGE_STORE_PATH = os.path.join(BASE_DIR, MEDIA_ROOT, COVER_IMAGE_PATH)

if not os.path.exists(COVER_IMAGE_STORE_PATH):
    os.makedirs(COVER_IMAGE_STORE_PATH)