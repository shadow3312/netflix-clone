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
        data['name'] = validated_data['name']
        data['password'] = validated_data['password']
        data['email'] = validated_data['email']

        user = self.Meta.model.objects.create_user(**data)
        if user.id != None:
            models.Profile.objects.create(name=user.name, user=user)

        return user

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
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all(), write_only=True)
    user = UserSerializer(read_only=True)

    def create(self, validated_data):
        data = {}
        data['name'] = validated_data.get('name')
        data['user'] = validated_data.get('user_id')
        data['type'] = validated_data.get('type')

        return self.Meta.model.objects.create(**data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.type = validated_data.get('type')
        instance.save()
        return instance

    class Meta:
        fields = ['id', 'name', 'type', 'user_id', 'user']
        model = models.Profile
