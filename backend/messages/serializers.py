from django.contrib.auth import get_user_model
from rest_framework import serializers
from messages.models import MessageThread, Message

UserModel = get_user_model()

class MessageSerializer(serializers.ModelSerializer):
     class Meta:
        model = Message
        fields = ['body', 'thread', 'sender', 'receiver', 'sent_at']

class MessageThreadSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = MessageThread
        fields = ['sender', 'receiver', 'messages']