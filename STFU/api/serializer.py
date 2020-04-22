from rest_framework import serializers
from .models import Match, Profile, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        print(user)
        profile = Profile.objects.create()
        profile.user = user
        return profile
        
class MatchSerializer(serializers.ModelSerializer):
    roster = UserSerializer(many=True)
    class Meta:
        model = Match
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    class Meta:
        model = Profile
        fields = '__all__'