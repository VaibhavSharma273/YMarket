# Generated by Django 4.0.3 on 2022-03-11 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postimage',
            name='image',
        ),
        migrations.AddField(
            model_name='postimage',
            name='image_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
