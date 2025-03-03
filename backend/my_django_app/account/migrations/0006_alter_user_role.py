# Generated by Django 4.1.4 on 2023-05-10 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_user_pharmacy_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Admin'), (2, 'Register_Officer'), (3, 'Pharmacy_Manager'), (4, 'Customer'), (5, 'Pharmacist'), (6, 'Deliverer')], default=3, null=True),
        ),
    ]
