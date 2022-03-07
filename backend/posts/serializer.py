from rest_framework import serializers
from posts.models import Post, PostImage

class PostSerializer(serializers.ModelSerializer):
    images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Post 
        fields = ['id', 'title', 'content', 'date_posted', 'author', 'price', 'category', 'images']
        read_only_fields = ['author']

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:

        model = PostImage
        fields = '__all__'

