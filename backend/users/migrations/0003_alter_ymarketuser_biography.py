# Generated by Django 4.0.3 on 2022-03-14 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_ymarketuser_avatar_url_ymarketuser_biography_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ymarketuser',
            name='biography',
            field=models.TextField(blank=True, default='default bio'),
            preserve_default=False,
        ),
    ]
