# Generated by Django 4.1.4 on 2023-07-31 06:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_user_verification_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]
