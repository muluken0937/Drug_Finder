# Generated by Django 4.1.4 on 2023-07-18 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_alter_user_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verification_code',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
