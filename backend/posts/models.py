from tkinter import CASCADE
from django.db import models
import os

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
    title = models.CharField(max_length=32)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('users.User', on_delete=models.CASCADE) # TODO: check with User and integrate
    price = models.DecimalField(max_digits=9, decimal_places=2)
    buy = models.BooleanField(null=False) # True for buy, False for sell
    isSold = models.BooleanField(default=False)
    category = models.CharField(max_length=32)
    isAnonymous = models.BooleanField(default=False)
    isDraft = models.BooleanField(default=False)

    def __str__(self):
        return self.title



class PostImages(models.Model):
    post = models.ForeignKey(Post, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_image_path, blank=True, null=True)