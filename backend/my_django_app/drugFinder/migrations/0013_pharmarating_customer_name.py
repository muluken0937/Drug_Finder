# Generated by Django 4.1.4 on 2023-07-30 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drugFinder', '0012_alter_prescription_prescriptionimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='pharmarating',
            name='customer_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
