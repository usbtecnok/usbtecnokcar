from django.db import models

class Corrida(models.Model):
    origem = models.CharField(max_length=100)
    destino = models.CharField(max_length=100)
    data = models.DateTimeField()
    preco = models.DecimalField(max_digits=8, decimal_places=2)  # preço com 2 casas decimais

    def __str__(self):
        return f"{self.origem} -> {self.destino} em {self.data.strftime('%d/%m/%Y %H:%M')} - R$ {self.preco}"
