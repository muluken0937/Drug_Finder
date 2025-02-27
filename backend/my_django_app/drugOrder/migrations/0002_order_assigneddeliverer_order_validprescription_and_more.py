# Generated by Django 4.1.4 on 2023-07-26 17:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('drugOrder', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='assignedDeliverer',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='validPrescription',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='order',
            name='payMethod',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='order',
            name='prescriptionImage',
            field=models.ImageField(null=True, upload_to='prescriptions/'),
        ),
    ]
