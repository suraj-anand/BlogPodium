import os
from server.settings import BASE_DIR

COVER_IMAGE_DIR = os.path.join(BASE_DIR, "apps", "blog", "cover-images")
if not os.path.exists(COVER_IMAGE_DIR):
    os.makedirs(COVER_IMAGE_DIR)