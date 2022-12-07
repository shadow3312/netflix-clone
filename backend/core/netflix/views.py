from scrud.views import ScrudViewset
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiTypes
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from . import models, serializers


class LoginAPIView(generics.GenericAPIView):
    permission_classes = (AllowAny, )
    serializer_class = serializers.LoginSerializer

    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")
        if email is None or password is None:
            return JsonResponse({'error': 'email and password required'}, status=400)
        user = authenticate(
            self, email=email, password=password)
        if not user:
            return JsonResponse({'error': 'Invalid credentials'}, status=404)
        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse(
            {
                'token': token.key,
                'id': user.id,
                'email': user.email,
                'tel': user.tel,
                'name': user.name,
                'is_active': user.is_active,
                'is_staff': user.is_staff
            },
            status=200
        )


class UserViewset(ScrudViewset):
    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'list': [IsAuthenticated],
        'get': [IsAuthenticated],
        'edit': [IsAuthenticated],
        'delete': [IsAdminUser],
        'active': [IsAdminUser],
        'desactive': [IsAdminUser],
        'inactives': [IsAdminUser],
        'search': [IsAuthenticated]
    }

    def __init__(self):
        super().__init__(get_user_model(), serializers.UserSerializer,
                         permission_classes=self.permission_classes_by_action)


class ProfileViewset(ScrudViewset):
    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'list': [IsAuthenticated],
        'get': [IsAuthenticated],
        'edit': [IsAuthenticated],
        'delete': [IsAdminUser],
        'active': [IsAdminUser],
        'desactive': [IsAdminUser],
        'inactives': [IsAdminUser],
        'search': [IsAuthenticated]
    }

    def __init__(self):
        super().__init__(models.Profile, serializers.ProfileSerializer,
                         permission_classes=self.permission_classes_by_action)
