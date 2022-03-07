from urllib import response
from django.contrib.auth.models import User 
from posts.models import Post, PostImage
from posts.serializer import PostSerializer
from rest_framework import mixins
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from django.shortcuts import get_object_or_404, render, redirect
from django.forms import modelformset_factory
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from .forms import ImageForm, PostForm
from .models import PostImage


class PostList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # dummy user for testing:
        # user = User.objects.get(pk=1)
        # return serializer.save(author=user)

        return serializer.save(author=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    # override Mixin 
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = self.perform_create(serializer)

        # save PostImages
        for afile in request.FILES.getlist('files'):
            pic = PostImage()
            pic.post= post 
            pic.image = afile
            pic.save()
            
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PostDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

