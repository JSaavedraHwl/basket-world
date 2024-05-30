from django.shortcuts import render
from django.http import JsonResponse
from django.templatetags.static import static
from .models import Producto
# Create your views here.
def home_view(request):
    context = {}
    return render(request, 'inicio.html', context)

def quienes_somos_view(request):
    context = {}
    return render(request, 'quienes_somos.html', context)

def productos_view(request, categoria):
    print(categoria)
    url = ''
    productos = []
    productos = Producto.objects.raw(f"select * from basket_producto bp join basket_categoria bc ON bc.categoria = '{categoria}' where bp.idCategoria = bc.idCategoria order by bp.precio desc;")
    for producto in productos:
        producto.urlImg = static(f'img/{producto.urlImg}')    
    
    context = {'categoria': categoria, 'productos':productos}
    return render(request, f'{categoria}.html', context)

def prueba_plantilla(request):
    context = {}
    return render(request, 'herencia_plantilla.html', context)

def obtener_productos(request, categoria):
    productos = Producto.objects.raw(f"select * from basket_producto bp join basket_categoria bc ON bc.categoria = '{categoria}' where bp.idCategoria = bc.idCategoria ;")
    context = {}
    data = [{'id': producto.id, 'nombre': producto.nombre, 'precio': producto.precio, 'urlImg': producto.urlImg} for producto in productos]
    return JsonResponse(data, safe=False)