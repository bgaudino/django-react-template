from django.urls import path

from . import views

urlpatterns = [
    path('<int:user>/', views.ScratchPadView.as_view(), name='scratch_pad_view')
]
