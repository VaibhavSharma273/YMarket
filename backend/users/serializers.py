from django.contrib.auth import get_user_model
from posts.models import Post 
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

UserModel = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    class Meta:
        model = UserModel
        fields = ('id', 'first_name', 'last_name', 'biography', 'avatar_url', 'email')
        read_only_fields = ('email',)

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', '')
        }
