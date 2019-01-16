# Generated by Django 2.1.4 on 2019-01-16 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20181108_0943'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='average_rating_given',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=2),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='average_rating_received',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=2),
        ),
    ]
