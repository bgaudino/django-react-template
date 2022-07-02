from rest_framework.generics import RetrieveUpdateAPIView

from .models import ScratchPad
from .serializers import ScratchPadSerializer


class ScratchPadView(RetrieveUpdateAPIView):
    model = ScratchPad
    serializer_class = ScratchPadSerializer
    lookup_field = 'user'

    def get_queryset(self):
        return self.model.objects.filter(user=self.request.user)
