# Generated by Django 3.0.5 on 2020-05-02 05:18

import api.randomizer
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import image_cropping.fields
import multiselectfield.db.fields
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, primary_key=True, serialize=False, unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('age', models.CharField(choices=[('1', '16-18'), ('2', '19-21'), ('3', '22-25'), ('4', '26-30'), ('5', '30+')], default='1', max_length=5)),
                ('zip_code', models.CharField(default='92122', max_length=5)),
                ('sports', multiselectfield.db.fields.MultiSelectField(choices=[('SC', 'Soccer'), ('BK', 'Basketball'), ('BS', 'Baseball')], default='SC', max_length=8)),
                ('bio', models.TextField(blank=True, max_length=500)),
                ('profile_image', models.ImageField(blank=True, default='https://i.stack.imgur.com/l60Hf.png', max_length=255, null=True, upload_to='images/%Y/%m/%d/')),
                ('cropping', image_cropping.fields.ImageRatioField('profile_image', '144x144', adapt_rotation=False, allow_fullsize=False, free_crop=False, help_text=None, hide_image_field=False, size_warning=False, verbose_name='cropping')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.CharField(default=api.randomizer.pkgen, max_length=8, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('type', models.CharField(choices=[('SC', 'Soccer'), ('BK', 'Basketball'), ('BS', 'Baseball')], default='SC', max_length=15)),
                ('age', models.CharField(choices=[('1', '16-18'), ('2', '19-21'), ('3', '22-25'), ('4', '26-30'), ('5', '30+')], default='1', max_length=5)),
                ('lat', models.FloatField(default=32.8801)),
                ('lon', models.FloatField(default=-117.2361)),
                ('location', django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(32.8801, -117.2361), srid=4326, verbose_name='location')),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('maxPlayers', models.IntegerField(default=11)),
                ('roster', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
