from django import forms
from .models import Post, PostImage

class PostForm(forms.ModelForm):
    title = forms.CharField(max_length=128)
    body = forms.CharField(label="Item Description.")
 
    class Meta:
        model = Post
        fields = ('title', 'body', )
 
 
class ImageForm(forms.ModelForm):
    image = forms.ImageField(label='Image')    
    class Meta:
        model = PostImages
        fields = ('image', )