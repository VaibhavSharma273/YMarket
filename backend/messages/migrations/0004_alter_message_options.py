# Generated by Django 4.0.3 on 2022-04-24 20:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_messages', '0003_alter_message_thread'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['sent_at']},
        ),
    ]
