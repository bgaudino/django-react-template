from rest_framework import serializers

from .models import ScratchPad


class ScratchPadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScratchPad
        fields = ['text']
