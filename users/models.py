from authtools.models import AbstractEmailUser

from notes.models import ScratchPad


class User(AbstractEmailUser):
    def save(self, *args, **kwargs):
        created = self.pk is None
        super().save(*args, **kwargs)

        if created:
            ScratchPad.objects.create(user=self)
