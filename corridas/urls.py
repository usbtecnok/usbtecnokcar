from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_corridas, name='listar_corridas'),
]
