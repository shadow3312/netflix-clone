import factory
from factory.django import DjangoModelFactory
from django.contrib.auth import get_user_model
from faker import Faker

fake = Faker()


class UserFactory(DjangoModelFactory):
    name = fake.name()
    tel = fake.msisdn()
    email = fake.email()
    password = fake.password()

    class Meta:
        model = get_user_model()
        django_get_or_create = ('name', 'tel', 'email', 'password')
