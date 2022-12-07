from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class MyUserManager(BaseUserManager):
    def get_by_natural_key(self, email_):
        return self.get(email=email_)

    def create_user(self, email, name, tel=None, password=None):
        if email is None:
            raise TypeError('Email required')
        user = self.model(email=self.normalize_email(
            email), name=name, tel=tel)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, name, tel=None, password=None):
        name = 'admin'
        if password is None:
            raise TypeError('Password required')
        user = self.create_user(
            email=email, name=name, tel=tel, password=password)
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

    def current(self):
        return self.first()

    def active_rows(self):
        return super().get_queryset().filter(is_active=True)

    def inactive_rows(self):
        return super().get_queryset().filter(is_active=False)


class TemporalQuerySet(models.Manager):
    def current(self):
        return self.first()

    def active_rows(self):
        return super().get_queryset().filter(is_active=True)

    def inactive_rows(self):
        return super().get_queryset().filter(is_active=False)
