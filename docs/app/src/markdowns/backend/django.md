# Django

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

Get more information at [https://www.djangoproject.com/](https://www.djangoproject.com/).

## Installing Python

On many systems Python comes pre-installed, you can try running the python command to start the Python interpreter to check and see if it is already installed. On windows you can try the py command which is a launcher which is more likely to work. If it is installed you will see a response which will include the version number, for example:

```
Python 3.9.6 (tags/v3.9.6:db3ff76, Jun 28 2021, 15:26:21) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
If you don't see this, you will need to install Python on your system.
```

If the version number is Python 2.x.y (where x and y are any number) you are using Python 2 which is no longer supported and is not a good choice for development. You can try running python3 to see if there is also a Python 3.x.y version installed, if not you'll want to install the latest version of Python.

If you do not have Python installed or need a newer version you can go to:

[https://www.python.org/downloads/](https://www.python.org/downloads/)

which will provide a button to download an installer for your particular system. The Python documentation also has a detailed guide on how to install and setup Python here:

[https://docs.python.org/3/using/index.html](https://docs.python.org/3/using/index.html)

Below are some system specific notes to keep in mind.

### Windows

On Windows the most stable build is available from the official download page

[https://www.python.org/downloads/](https://www.python.org/downloads/)

You should download and run the installer from that page to get the latest version of Python for your system. You can refer to the Python documentation for more details on the installation process and getting started:

[https://docs.python.org/3/using/windows.html](https://docs.python.org/3/using/windows.html)

### Mac

For macOS 10.9 (Jaguar) up until 12.3 (Catalina) the operating system includes Python 2, which is no longer supported and is not a good choice for development. You should go to do the downloads page: [https://www.python.org/downloads/](https://www.python.org/downloads/) and download the installer.

For newer versions of macOS, Python is no longer included by default and you will have to download and install it. You can refer to the Python documentation for more details on the installation process and getting started:

[https://docs.python.org/3/using/mac.html](https://docs.python.org/3/using/mac.html)

### Linux

On most Linux distributions Python comes pre-installed and/or available via the distribution's package managers. Below are some common examples, but refer to your specific distribution's documentation and package list to get the most up to date instructions.

If you'd like to download and build Python from source (or your distribution's package manager does not include a version of Python you need) you can download a source tarball from the general download page: https://www.python.org/downloads/

```shell
# Red Hat, CentOS, or Fedora
dnf install python3 python3-devel

# Debian or Ubuntu
apt-get install python3 python3-dev

# Gentoo
emerge dev-lang/python

# Arch Linux
pacman -S python3
```

Get more information at [https://wiki.python.org/moin/BeginnersGuide/Download](https://wiki.python.org/moin/BeginnersGuide/Download).

## Installing Django

nstallation instructions are slightly different depending on whether you’re installing a distribution-specific package, downloading the latest official release, or fetching the latest development version.

```shell
mkdir myproject
cd myproject

python3 -m venv myvenv
source myvenv/bin/activate

pip install django
```

## Creating the API

Here, we'll create a simple API for managing posts.

```shell
pip install djangorestframework
django-admin startproject myproject .
cd myproject
django-admin startapp quickstart
cd ..
```

Let's complete the generated files for models, serializers, views, and urls.

```python
# myproject/quickstart/apps.py

from django.apps import AppConfig


class QuickstartConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myproject.quickstart'


# myproject/quickstart/models.py

from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# myproject/settings.py

# ...
INSTALLED_APPS = [
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myproject.quickstart',
]
# ...


# myproject/quickstart/serializers.py
from rest_framework import serializers

from myproject.quickstart.models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


# myproject/quickstart/views.py
from rest_framework import viewsets
from myproject.quickstart.models import Post

from myproject.quickstart.serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    """
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer


# myproject/quickstart/urls.py
from django.contrib import admin
from django.urls import include, path

from rest_framework import routers

from myproject.quickstart import views

router = routers.DefaultRouter()
router.register(r'posts', views.PostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
```

Now, you have inserted the columns for the Post model. Next, you need to generate the migrations and apply them to the database.

```shell
python manage.py makemigrations quickstart
python manage.py migrate
```

Finally, you can run the development server to test the API.

```shell
python manage.py runserver
```

You can now access the API at [http://localhost:8000/api/posts](http://localhost:8000/api/posts).

This API could be used as a backend for a frontend application built with a framework like React, Vue, or Angular.
