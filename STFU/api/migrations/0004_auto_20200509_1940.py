# Generated by Django 3.0.6 on 2020-05-09 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200509_1158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]
