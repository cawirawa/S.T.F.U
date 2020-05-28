from django.db import models
from django.contrib.gis.db import models
from .randomizer import pkgen
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField
from multiselectfield import MultiSelectField
from django.contrib.auth.models import AbstractUser
from image_cropping import ImageRatioField
from django.contrib.gis.geos import Point



SPORTS_TYPE = (
    ("SC", "Soccer"),
    ("BK", "Basketball"),
    ("BS", "Baseball"),
    ("FB", "Football"),
    ("VB", "Volleyball")
)

AGE_RANGE = (
    ("1", "16-18"),
    ("2", "19-21"),
    ("3", "22-25"),
    ("4", "26-30"),
    ("5", "30+"),
)


class User(AbstractUser, ):
    email = models.EmailField(unique=True, primary_key=True)

class Match(models.Model):
    id = models.CharField(max_length=8, primary_key=True, default=pkgen)
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=500)
    type = models.CharField(choices=SPORTS_TYPE, max_length=15, default="SC")
    age = models.CharField(choices=AGE_RANGE, max_length=5, default="1" )
    #  latitude & longitude, By default is UCSD's lat & lon
    lat = models.FloatField(default=32.8801)
    lon = models.FloatField(default=-117.2361)
    location = models.PointField(null=False, blank=False, srid=4326, verbose_name="location", default=Point(32.8801, -117.2361))
    time = models.DateTimeField(default=now)
    maxPlayers = models.IntegerField(default=11)
    roster = models.ManyToManyField(User)    
    city = models.CharField(max_length=100, default="San Diego")
    host_id = models.IntegerField(default=0, blank=True, null=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    phone = PhoneNumberField()
    age = models.CharField(choices=AGE_RANGE, max_length=5, default="1" )
    zip_code = models.CharField(max_length=5, default="92122" )
    sports = MultiSelectField(choices=SPORTS_TYPE, min_choices=1, default="SC")
    bio = models.TextField(max_length=500, blank=True)
    profile_image = models.ImageField(upload_to='images/%Y/%m/%d/', max_length=255, null=True, blank=True)
    cropping = ImageRatioField('profile_image', '144x144')