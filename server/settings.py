"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure--&1g7_uxx)o&@61k@@g7d!q*d3@q^oejw*bw@c@havfne^uwv%'
JWT_SECRET = 'django-insecure--&1g7_uxx)o&@61k@@g7d!q*d3@q^oejw*bw@c@havfne^uwv%'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition
USER_APPS = [
    "apps.api",
    "apps.blog",
    "apps.podcast"
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "corsheaders",
    "rest_framework",
    "django_filters",
] + USER_APPS

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Cors Definition
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]


CORS_ALLOW_HEADERS = [
    "WWW-Authenticate",
    "Authorization",
    "Proxy-Authenticate",
    "Proxy-Authorization",
    "Age",
    "Cache-Control",
    "Clear-Site-Data",
    "Expires",
    "Pragma",
    "Warning",
    "Accept-CH",
    "Accept-CH-Lifetime",
    "Content-DPR",
    "Device-Memory",
    "DPR",
    "Viewport-Width",
    "Width",
    "Downlink",
    "ECT",
    "RTT",
    "Save-Data",
    "Last-Modified",
    "ETag",
    "If-Match",
    "If-None-Match",
    "If-Modified-Since",
    "If-Unmodified-Since",
    "Vary",
    "Connection",
    "Keep-Alive",
    "Accept",
    "Accept-Encoding",
    "Accept-Language",
    "Expect",
    "Max-Forwards",
    "Cookie",
    "Set-Cookie",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods",
    "Access-Control-Expose-Headers",
    "Access-Control-Max-Age",
    "Access-Control-Request-Headers",
    "Access-Control-Request-Method",
    "Origin",
    "Timing-Allow-Origin",
    "Content-Disposition",
    "Content-Length",
    "Content-Type",
    "Content-Encoding",
    "Content-Language",
    "Content-Location",
    "Forwarded",
    "X-Forwarded-For",
    "X-Forwarded-Host",
    "X-Forwarded-Proto",
    "Via",
    "Location",
    "From",
    "Host",
    "Referer",
    "Referrer-Policy",
    "User-Agent",
    "Allow",
    "Server",
    "Accept-Ranges",
    "Range",
    "Content-Range",
    "Cross-Origin-Embedder-Policy",
    "Cross-Origin-Opener-Policy",
    "Cross-Origin-Resource-Policy",
    "Content-Security-Policy",
    "Content-Security-Policy-Report-Only",
    "Expect-CT",
    "Feature-Policy",
    "Origin-Isolation",
    "Strict-Transport-Security",
    "Upgrade-Insecure-Requests",
    "X-Content-Type-Options",
    "X-Download-Options",
    "X-Frame-Options",
    "X-Permitted-Cross-Domain-Policies",
    "X-Powered-By",
    "X-XSS-Protection",
    "Sec-Fetch-Site",
    "Sec-Fetch-Mode",
    "Sec-Fetch-User",
    "Sec-Fetch-Dest",
    "Service-Worker-Navigation-Preload",
    "Last-Event-ID",
    "NEL",
    "Ping-From",
    "Ping-To",
    "Report-To",
    "Transfer-Encoding",
    "TE",
    "Trailer",
    "Accept-Push-Policy",
    "Accept-Signature",
    "Alt-Svc",
    "Date",
    "Early-Data",
    "Large-Allocation",
    "Link",
    "Push-Policy",
    "Retry-After",
    "Signature",
    "Signed-Headers",
    "Server-Timing",
    "Service-Worker-Allowed",
    "SourceMap",
    "Upgrade",
    "X-DNS-Prefetch-Control",
    "X-Firefox-Spdy",
    "X-Pingback",
    "X-Requested-With",
    "X-Robots-Tag",
    "X-UA-Compatible",
    "ContentType",
    "Content-type",
    "content-type",
    "contenttype",
    "contentType",
    "accept",
    "authorization",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    "accept-encoding",
    "Contentype",
]

ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, "client", "build"),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'assets/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "client", "build", "assets"),
    os.path.join(BASE_DIR, "client", "build", "images"),
]

# MEDIA CONFIG
MEDIA_ROOT = "media/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
