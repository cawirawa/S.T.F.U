from rest_framework import viewsets, status, permissions
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Match, Profile, User
from .serializer import MatchSerializer, ProfileSerializer, UserSerializer
from django.contrib.gis.geos import *
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from geopy.geocoders import Nominatim
from datetime import *

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (permissions.AllowAny, )

    @action(detail=False, methods=['POST'])
    def create_match(self, request, pk=None):
        if 'roster'  in request.data and 'name' in request.data and 'type' in request.data and 'age' in request.data and 'lat' in request.data and 'lon' in request.data and 'time' in request.data and 'maxPlayers' in request.data and 'description' in request.data:
            obj = Match.objects.create()
            obj.name = request.data['name']
            obj.type = request.data['type']
            obj.age = request.data['age']
            obj.lat = request.data['lat']
            obj.lon = request.data['lon']
            obj.time = request.data['time']
            obj.description = request.data['description']
            obj.maxPlayers = request.data['maxPlayers']
            obj.location = Point(float(request.data['lat']), float(request.data['lon']))
            geolocator = Nominatim(user_agent="api")
            city = geolocator.reverse(str(request.data['lat']) + ", " + str(request.data['lon']))
            city = city.raw
            try:
                city = city['address']['city']
            except KeyError:
                city = city['address']['state']

            obj.city = city
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
        if 'roster'  in request.data and 'name' in request.data and 'type' in request.data and 'age' in request.data and 'lat' in request.data and 'lon' in request.data and 'time' in request.data and 'maxPlayers' in request.data and 'description' in request.data:
            try:
                print(request.data['id'])
                obj = Match.objects.get(id=request.data['id'])
            except Match.DoesNotExist:
                response = {'message': 'Match does not exist!'}
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            obj.roster.set([])
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
            obj.description = request.data['description']
            obj.maxPlayers = request.data['maxPlayers']
            obj.location = Point(float(request.data['lat']), float(request.data['lon']))
            geolocator = Nominatim(user_agent="api")
            city = geolocator.reverse(str(request.data['lat']) + ", " + str(request.data['lon']))
            city = city.raw
            try:
                city = city['address']['city']
            except KeyError:
                city = city['address']['state']

            obj.city = city
            for i in range(len (request.data['roster'])):
                try:
                    user = User.objects.get(email=request.data['roster'][i]['email'])
                except User.DoesNotExist:
                    print(User)
                    response = {'message': 'User in the roster does not exist!'}
                    return Response(response, status=status.HTTP_404_NOT_FOUND)
                obj.roster.add(user)
            obj.save()
            obj.save()
            serializer = MatchSerializer(obj, many=False)
            response = {'message': 'Successfully updated match', 'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)  
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def match_cards(self, request, pk=None):
        if 'lat' in request.headers and 'lon' in request.headers and 'dist' in request.headers:
            print(request.headers['lat'] + request.headers['lat'])
            pnt = Point(x=float(request.headers['lat']), y=float(request.headers['lon']), srid=4326)
            distance = float(request.headers['dist']) / 0.00062137 
            ref_location = pnt
            queryset = Match.objects.filter(location__distance_lte=(ref_location, D(m=distance))).annotate(distance=Distance("location", ref_location)).order_by("distance")
            # Only return today - next 7 days matches
            startdate = date.today()
            enddate = startdate + timedelta(days=30)
            queryset = queryset.filter(time__range=[startdate, enddate])
            serializer = MatchSerializer(queryset, many=True)
            result = serializer.data
            response = {'message': 'Successfully sorted match by distance', 'result': result }
            return Response(response, status=status.HTTP_200_OK)  
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = (TokenAuthentication, )
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
    
    @action(detail=False, methods=['POST'], permission_classes=[permissions.AllowAny])
    def create_user(self, request, pk=None):
        if 'email' in request.data and 'name' in request.data and 'username' in request.data:
            try: 
                user = User.objects.get(username=request.data['username'])
                response = {'message': 'username used!'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                try: 
                    user = User.objects.get(email=request.data['email'])
                    response = {'message': 'email used!'}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
                except User.DoesNotExist:
                    user = User.objects.create(username=request.data['username'], email=request.data['email'])
                    user.first_name = request.data['name']
                    user.save()
                    obj = Profile.objects.create(user=user)
                    serializer = ProfileSerializer(obj, many=False)
                    token = Token.objects.create(user=user)
                    response = {'message': 'Successfully created User', 'result': serializer.data, 'token': token.key }
                    return Response(response, status=status.HTTP_200_OK)
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def log_in(self, request, pk=None):
        if 'email' in request.headers:
            try: 
                user = User.objects.get(email=request.headers['email'])
                obj = Profile.objects.get(user=user)
                serializer = ProfileSerializer(obj, many=False)
                token = Token.objects.get(user=user)
                response = {'message': 'Successfully fetched User', 'result': serializer.data, 'token': token.key }
                return Response(response, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                response = {'message': 'User does not exist!'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=False, methods=['POST'])
    def update_profile(self, request, pk=None):
        if 'email' in request.data and 'name' in request.data and 'phone' in request.data and 'age' in request.data and 'lat' in request.data and 'lon' in request.data and 'sports' in request.data and 'bio' in request.data  and 'skill' in request.data and 'favoriteMatch' in request.data:
            try: 
                user = User.objects.get(email=request.data['email'])
                profile = Profile.objects.get(user=user)
                user.first_name = request.data['name']
                profile.phone = request.data['phone']
                profile.age = request.data['age']
                profile.lon = request.data['lon']
                profile.lat = request.data['lat']
                profile.sports = request.data['sports']
                profile.bio = request.data['bio']
                profile.profile_image = request.FILES['profile_image']
                profile.skill = request.data['skill']
                profile.favoriteMatch = request.data['favoriteMatch']
                user.save()
                profile.save()
                serializer = ProfileSerializer(profile, many=False)
                response = {'message': 'Successfully updated profile with profile image', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)  

            except User.DoesNotExist:
                response = {'message': 'User does not exist!'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        elif 'email' in request.data and 'phone' in request.data and 'age' in request.data and 'zip_code' in request.data and 'sports' in request.data and 'bio' in request.data:
            try: 
                user = User.objects.get(email=request.data['email'])
                profile = Profile.objects.get(user=user)
                profile.phone = request.data['phone']
                profile.age = request.data['age']
                profile.lat = request.data['lat']
                profile.lon = request.data['lon']
                profile.sports = request.data['sports']
                profile.bio = request.data['bio']
                profile.save()
                serializer = ProfileSerializer(obj, many=False)
                response = {'message': 'Successfully updated profile', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)  

            except User.DoesNotExist:
                response = {'message': 'User does not exist!'}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {'message': 'Please provide all attributes!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)    


       


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (permissions.AllowAny, )