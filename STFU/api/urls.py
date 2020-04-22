from django.urls import path, include
from rest_framework import routers
from .views import MatchViewSet, ProfileViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('match', MatchViewSet)
router.register('profile', ProfileViewSet)
router.register('user', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
]