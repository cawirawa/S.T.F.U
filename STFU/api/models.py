from django.db import models
from django.contrib.auth.models import User
from .randomizer import pkgen
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField

SPORTS_TYPE = (
    ("SC", "Soccer"),
    ("BK", "Basketball"),
    ("BS", "Baseball"),
)

AGE_RANGE = (
    ("1", "16-18"),
    ("2", "19-21"),
    ("3", "22-25"),
    ("4", "26-30"),
    ("5", "30+"),
)

class Match(models.Model):
    id = models.CharField(max_length=8, primary_key=True, default=pkgen)
    name = models.CharField(max_length=20)
    type = models.CharField(choices=SPORTS_TYPE, max_length=15, default="SC")
    age = models.CharField(choices=AGE_RANGE, max_length=5, default="1" )
    #  latitude & longitude, By default is UCSD's lat & lon
    lat = models.FloatField(default=32.8801)
    lon = models.FloatField(default=-117.2361)
    time = models.DateTimeField(default=now)
    maxPlayers = models.IntegerField(default=11)
    roster = models.ManyToManyField(User)    


