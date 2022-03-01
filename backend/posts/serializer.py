from rest_framework import serializers
from posts.models import Post 

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ['id', 'title', 'content', 'date_posted', 'author', 'price', 'category']
        read_only_fields = ['author']

