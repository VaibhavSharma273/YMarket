from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

UserModel = get_user_model()

# Create your tests here.
class RegistrationTestCase(APITestCase):
    def test_valid_registration(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post('/users/register/', data)
        assert response.status_code == status.HTTP_201_CREATED

    def test_invalid_first_name(self):
        data = {'email': "test@gmail.com", 'first_name': '', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post('/users/register/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_invalid_last_name(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': '', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post('/users/register/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_duplicate_email(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post('/users/register/', data)
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass1'}
        response = self.client.post('/users/register/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_different_password(self):
        data = {'email': "test@gmail.com", 'first_name': 'first', 'last_name': 'name', 'password1': 'testpass1', 'password2': 'testpass2'}
        response = self.client.post('/users/register/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST


from allauth.account.admin import EmailAddress

class LoginLogoutTestCase(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            first_name="first",
            last_name="name",
            email="test@yale.edu",
            password='testpass1'
        )

        EmailAddress.objects.create(
            id=1,
            verified=1,
            primary=1,
            user_id = self.user.id,
            email="test@yale.edu"
        )

    def test_valid_login(self):
        data = {'email': "test@yale.edu", 'password': 'testpass1'}
        response = self.client.post('/users/login/', data)
        assert response.status_code == status.HTTP_200_OK
    
    def test_invalid_email(self):
        data = {'email': "", 'password': 'testpass1'}
        response = self.client.post('/users/login/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_invalid_password(self):
        data = {'email': "test@yale.edu", 'password': ''}
        response = self.client.post('/users/login/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_valid_logout(self):
        response = self.client.post('/users/logout/')
        assert response.status_code == status.HTTP_200_OK

    def test_invalid_logout(self):
        response = self.client.get('/users/logout/')
        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

class PasswordTestCase(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            first_name="first",
            last_name="name",
            email="test@yale.edu",
            password='testpass1'
        )

        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

        EmailAddress.objects.create(
            id=1,
            verified=1,
            primary=1,
            user_id = self.user.id,
            email="test@yale.edu"
        )
    
    def test_valid_password_change(self):
        data = {'new_password1': 'testpass2', 'new_password2': 'testpass2'}
        response = self.client.post('/users/password/change/', data)
        data = {'email': "test@yale.edu", 'password': 'testpass1'}
        response = self.client.post('/users/login/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
