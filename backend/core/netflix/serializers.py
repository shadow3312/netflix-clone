from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'password']


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        data = {}
        data['name'] = validated_data['password']
        data['password'] = validated_data['password']
        data['email'] = validated_data['email']

        return self.Meta.model.objects.create_user(**data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.password = validated_data.get('password')
        instance.email = validated_data.get('email')

        instance.save()

        return instance

    class Meta:
        fields = ['id', 'name', 'tel', 'email',
                  'password', 'is_staff', 'is_active']
        model = get_user_model()
        extra_kwargs = {
            'password': {'write_only': True}
        }


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = models.Profile
