from rest_framework import viewsets, status, permissions
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Match, Profile, User
from .serializer import MatchSerializer, ProfileSerializer, UserSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    @action(detail=False, methods=['POST'])
    def create_match(self, request, pk=None):
        if 'id' in request.data and 'roster'  in request.data and 'name' in request.data and 'type' in request.data and 'age' in request.data and 'lat' in request.data and 'lon' in request.data and 'time' in request.data and 'maxPlayers' in request.data:
            obj = Match.objects.create()
            obj.name = request.data['name']
            obj.type = request.data['type']
            obj.age = request.data['age']
            obj.lat = request.data['lat']
            obj.lon = request.data['lon']
            obj.time = request.data['time']
            obj.maxPlayers = request.data['maxPlayers']
            for i in range(len (request.data['roster'])):
                try:
                    user = User.objects.get(email=request.data['roster'][i]['email'])
                except User.DoesNotExist:
                    print(User)
                    response = {'message': 'User in the roster does not exist!'}
                    return Response(response, status=status.HTTP_404_NOT_FOUND)
                obj.roster.add(user)
            obj.save()
            serializer = MatchSerializer(obj, many=False)
            response = {'message': 'Successfully created match', 'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)  
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def update_match(self, request, pk=None):
        if 'id' in request.data and 'roster'  in request.data and 'name' in request.data and 'type' in request.data and 'age' in request.data and 'lat' in request.data and 'lon' in request.data and 'time' in request.data and 'maxPlayers' in request.data:
            try:
                obj = Match.objects.get(id=request.data['id'])
            except Match.DoesNotExist:
                response = {'message': 'Match does not exist!'}
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            obj.roster.set( obj.roster.filter(id="0"))
            for i in range(len (request.data['roster'])):
                try:
                    user = User.objects.get(email=request.data['roster'][i]['email'])
                except User.DoesNotExist:
                    print(User)
                    response = {'message': 'User in the roster does not exist!'}
                    return Response(response, status=status.HTTP_404_NOT_FOUND)
                obj.roster.add(user)
            obj.name = request.data['name']
            obj.type = request.data['type']
            obj.age = request.data['age']
            obj.lat = request.data['lat']
            obj.lon = request.data['lon']
            obj.time = request.data['time']
            obj.maxPlayers = request.data['maxPlayers']
            obj.save()
            serializer = MatchSerializer(obj, many=False)
            response = {'message': 'Successfully updated match', 'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)  
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (permissions.AllowAny, )

    @action(detail=False, methods=['GET'])
    def get_profile(self, request, pk=None):
        if 'email' in request.headers:
            try:
                user = User.objects.get(email=request.headers['email'])
                obj = Profile.objects.get(user=user)
            except User.DoesNotExist:
                response = {'message': 'User does not exist!'}
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            except Profile.DoesNotExist:
                response = {'message': 'Profile does not exist!'}
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            serializer = ProfileSerializer(obj, many=False)
            response = {'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK) 
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
       


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (permissions.AllowAny, )