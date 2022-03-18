# Generated by Django 4.0.3 on 2022-03-11 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ymarketuser',
            name='avatar_url',
            field=models.CharField(blank=True, max_length=250),
        ),
        migrations.AddField(
            model_name='ymarketuser',
            name='biography',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='ymarketuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='ymarketuser',
            name='first_name',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='ymarketuser',
            name='last_name',
            field=models.CharField(max_length=150),
        ),
    ]
