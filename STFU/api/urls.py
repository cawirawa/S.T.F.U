from django.urls import path, include
from rest_framework import routers
from .views import MatchViewSet, ProfileViewSet

router = routers.DefaultRouter()
router.register('match', MatchViewSet)
router.register('profile', ProfileViewSet)


urlpatterns = [
    path('', include(router.urls)),
]