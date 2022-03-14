from rest_framework import serializers
from posts.models import Post, PostImage

class PostSerializer(serializers.ModelSerializer):
    postimages = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    author = serializers.ReadOnlyField(source='author.email')
    
    class Meta:
        model = Post 
        fields = ['id', 'title', 'content', 'date_posted', 'author', 'price', 'category', 'postimages']

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:

        model = PostImage
        fields = '__all__'
        read_only_fields = ['post']

