from django.urls import path, include
from . import views

app_name = 'netflix'

urlpatterns = [
    path('v1/', include([
        path('auth/', include([
            path('login/', views.LoginAPIView.as_view(), name='login')
        ])),
        path('user/', include([
            path('', views.UserViewset.as_view(
                {'get': 'list', 'post': 'create'}), name='list_users'),
            path('<int:pk>/', views.UserViewset.as_view({'get': 'get'})),
            path('<int:pk>/edit/', views.UserViewset.as_view({'put': 'edit'})),
            path('<int:pk>/delete/',
                 views.UserViewset.as_view({'delete': 'delete'})),
            path(
                'search/', views.UserViewset.as_view({'get': 'search'}), name='user-search'),
        ])),

        path('profile/', include([
            path('', views.ProfileViewset.as_view(
                {'get': 'list', 'post': 'create'})),
            path('<int:pk>/', views.ProfileViewset.as_view({'get': 'get'})),
            path('<int:pk>/edit/',
                 views.ProfileViewset.as_view({'put': 'edit'})),
            path('<int:pk>/delete/',
                 views.ProfileViewset.as_view({'delete': 'delete'})),
            path('search/', views.ProfileViewset.as_view({'get': 'search'})),
        ]))

    ]))
]
