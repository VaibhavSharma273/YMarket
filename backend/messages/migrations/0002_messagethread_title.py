# Generated by Django 4.0.3 on 2022-04-19 23:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_messages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='messagethread',
            name='title',
            field=models.TextField(default='title'),
            preserve_default=False,
        ),
    ]
