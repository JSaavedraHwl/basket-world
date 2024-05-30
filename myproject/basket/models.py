from django.db import models

# Create your models here.
class Categoria(models.Model):
    id_categoria = models.AutoField(db_column='idCategoria', primary_key=True)
    categoria = models.CharField(max_length=30, blank=False, null=False)
    def __str__(self):
        return str(self.categoria)
    
class Producto(models.Model):
    id = models.CharField(primary_key=True, max_length=10)
    nombre = models.CharField(max_length=50)
    precio = models.IntegerField()
    descripcion = models.CharField(max_length=255)
    id_categoria = models.ForeignKey('Categoria',on_delete=models.CASCADE, db_column='idCategoria')
    urlImg = models.CharField(max_length=500)
    def __str__(self):
        return str(self.nombre)+" Descripción: "+str(self.descripcion)