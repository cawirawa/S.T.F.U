from django.urls import path, include
from rest_framework import routers
from .views import MatchViewSet

router = routers.DefaultRouter()
router.register('match', MatchViewSet)


urlpatterns = [
    path('', include(router.urls)),
]