from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password',
            'confirmation',
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'confirmation': {'write_only': True}
        }

    def create(self, validated_data):
        if validated_data['password'] != validated_data['confirmation']:
            raise serializers.ValidationError('Passwords must match')
        try:
            validate_password(validated_data['password'])
        except ValidationError as e:
            raise serializers.ValidationError('\n'.join(e.messages))
        validated_data.pop('confirmation')
        user = User.objects.create(**validated_data)
        return user
