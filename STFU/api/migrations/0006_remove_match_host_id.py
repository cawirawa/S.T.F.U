# Generated by Django 3.0.6 on 2020-05-13 14:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_match_host_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='match',
            name='host_id',
        ),
    ]
