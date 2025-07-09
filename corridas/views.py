from django.shortcuts import render
from .models import Corrida

def listar_corridas(request):
    corridas = Corrida.objects.all()
    return render(request, 'corridas/listar_corridas.html', {'corridas': corridas})


# Create your views here.
