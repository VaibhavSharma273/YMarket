from django.http import Http404
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from django.contrib import messages
from allauth.account.views import ConfirmEmailView, get_adapter
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

UserModel = get_user_model()

# Create your views here.
class UserProfileView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserModel.objects.all()
    serializer_class = UserProfileSerializer

class JsonConfirmEmailView(APIView, ConfirmEmailView):
    def get(self, *args, **kwargs):
        try:
            self.object = self.get_object()
            return self.post(*args, **kwargs)
        except Http404:
            self.object = None
            data = {'detail': 'This link is invalid or expired.'}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

    def post(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)

        get_adapter(self.request).add_message(
            self.request,
            messages.SUCCESS,
            "account/messages/email_confirmed.txt",
            {"email": confirmation.email_address.email},
        )

        data = {'detail': 'Email confirmed.'}
        return Response(data, status=status.HTTP_200_OK)
