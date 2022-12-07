"""core URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('netflix.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/schema/ui/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='ui'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
