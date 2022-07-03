from django.conf import settings
from django.db import models


class ScratchPad(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    text = models.TextField()

    def __str__(self):
        return f"{self.user}'s Scratch Pad"
