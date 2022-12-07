import json
from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import APIClient
from factories import UserFactory
from faker import Faker

faker = Faker()


class TestUser(APITestCase):
    """ Test module for users """

    def setUp(self):
        self.client = APIClient()
        self.user = UserFactory()
        self.expected_content = {
            "id": self.user.id,
            "name": self.user.name,
            "tel": self.user.tel,
            "email": self.user.email,
            "is_staff": self.user.is_staff,
            "is_active": self.user.is_active
        }

    def test_200_list(self):
        url = reverse_lazy('netflix:list_users')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        res = json.loads(response.content)
        self.assertListEqual(
            [self.expected_content], res['results'])

    def test_200_get(self):
        url = reverse_lazy('netflix:get_user', kwargs={'pk': self.user.pk})
        response = self.client.get(url)

        res = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(self.expected_content, res)

    def test_404_get(self):
        url = reverse_lazy('netflix:get_user', kwargs={'pk': 300})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_201_create(self):
        url = reverse_lazy('netflix:list_users')
        email = 'email@gmail.com'

        user_dict = {
            "name": self.user.name,
            "tel": self.user.tel,
            'email': email,
            'password': self.user.password
        }

        response = self.client.post(url, user_dict, format='json')
        res = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_400_create(self):
        url = reverse_lazy('netflix:list_users')
        user_dict = {
            'name': self.user.name,
            'tel': self.user.tel,
            'email': self.user.email,
            'password': self.user.password
        }
        response = self.client.post(url, user_dict, format='json')
        res = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
