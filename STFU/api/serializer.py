from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Match

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class MatchSerializer(serializers.ModelSerializer):
    roster = UserSerializer(many=True)
    class Meta:
        model = Match
        fields = '__all__'