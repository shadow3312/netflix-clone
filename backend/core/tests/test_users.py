import json
from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.test import APIRequestFactory
from factories import UserFactory


class TestUser(APITestCase):
    """ Test module for users """

    def setUp(self):
        self.url = reverse_lazy('netflix:list_users')
        self.user = UserFactory()

    def test_list(self):
        response = self.client.get(self.url)
        response.render()

        expected_content = [
            {
                "id": self.user.id,
                "name": self.user.name,
                "tel": self.user.tel,
                "email": self.user.email,
                "is_staff": self.user.is_staff,
                "is_active": self.user.is_active
            }
        ]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        res = json.loads(response.content)
        self.assertListEqual(
            expected_content, res['results'])
