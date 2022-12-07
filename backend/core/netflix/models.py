from django.db import models
from django.contrib.auth.models import Group, AbstractBaseUser, BaseUserManager, PermissionsMixin
from . import managers


class MyUser(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(max_length=191, unique=True)
    tel = models.CharField(max_length=191, null=True, blank=True)
    name = models.CharField(max_length=191)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = managers.MyUserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        managed = True
        db_table = 'auth_user'
        ordering = ['id']

    def natural_key(self):
        return self.email


class Profile(models.Model):
    TYPES = (
        ("1", "ADULT"),
        ("2", "KID")
    )
    name = models.CharField(max_length=191)
    profile_img = models.ImageField(
        blank=True,
        null=True,
        upload_to='profile/',
        default='profile/user.jpg'
    )
    type = models.CharField(max_length=191, choices=TYPES, default="1")
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)

    objects = managers.TemporalQuerySet()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'profile'
        managed = True
