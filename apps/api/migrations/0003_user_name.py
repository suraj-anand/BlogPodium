# Generated by Django 5.0.1 on 2024-03-01 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]