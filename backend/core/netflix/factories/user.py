import factory
from factory.django import DjangoModelFactory
from django.contrib.auth import get_user_model


class UserFactory(DjangoModelFactory):
    name = factory.Faker("name")
    tel = factory.Faker("tel")
    email = factory.Faker("email")
    password = factory.Faker("password")

    class Meta:
        model = get_user_model()
