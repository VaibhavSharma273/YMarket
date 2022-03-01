from django.db import models
from django.contrib.auth.models import User 
from django.utils import timezone 
import os
from PIL import Image 

# Title
# Content
# Date Posted
# Author
# Price
# BuyOrSell
# Images
# isSold
# Category
# isAnonymous
# isDraft

def get_image_path(instance, filename):
    return os.path.join('data', 'posts', str(instance.id), filename)

# Create your models here.
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64, blank=False)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE) # TODO: check with User and integrate
    price = models.DecimalField(max_digits=9, decimal_places=2, blank=True, null=True)
    category = models.CharField(max_length=32, default='general')

    # buy = models.BooleanField(null=False) # True for buy, False for sell
    # isSold = models.BooleanField(default=False)
    # isAnonymous = models.BooleanField(default=False)
    # isDraft = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.author) + ": " + self.title


class PostImage(models.Model):
    id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_image_path, blank=True, null=True)