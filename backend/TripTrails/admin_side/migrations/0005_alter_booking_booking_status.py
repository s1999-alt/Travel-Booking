# Generated by Django 5.1.2 on 2024-11-01 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_side', '0004_alter_booking_booking_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booking_status',
            field=models.CharField(choices=[('Upcoming', 'Upcoming'), ('Ongoing', 'Ongoing'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled'), ('Cancelled by TripTrails', 'Cancelled by TripTrails')], default='Upcoming', max_length=50),
        ),
    ]
