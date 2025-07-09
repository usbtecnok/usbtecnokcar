from django import forms
from .models import Corrida

class CorridaForm(forms.ModelForm):
    class Meta:
        model = Corrida
        fields = ['origem', 'destino', 'data', 'preco']
        widgets = {
            'data': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        }
