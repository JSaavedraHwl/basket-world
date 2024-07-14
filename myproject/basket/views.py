from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.http import JsonResponse
from django.templatetags.static import static
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth import authenticate, login, logout
from .forms.producto_form import ProductoForm
from .forms.usuario_form import UsuarioForm
from .models import Producto

def es_admin(user):
    return user.is_authenticated and user.is_superuser
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


def crud_productos(request):
    if not es_admin(request.user):
        messages.error(request, 'No tienes permiso para acceder a esta página.')
        return redirect('index')
    productos = Producto.objects.all()
    context = { "productos": productos}
    return render(request, 'lista_productos.html', context)

@login_required
@user_passes_test(es_admin)
def agregar_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('crud_productos')
    else:
        form = ProductoForm()
    context = {'form': form}
    return render(request, 'agregar_producto.html', context)

@login_required
@user_passes_test(es_admin)
def editar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    if request.method == 'POST':
        form = ProductoForm(request.POST, instance=producto)
        if form.is_valid():
            form.save()
            return redirect('crud_productos')
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'editar_producto.html', {'form': form})

@login_required
@user_passes_test(es_admin)
def eliminar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    producto.delete()
    return redirect('crud_productos')

def vista_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Correo o contraseña incorrectos')
    return redirect('index')

def register(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirigir al usuario a la página de inicio de sesión o a donde prefieras
            return redirect('login')
    else:
        form = UsuarioForm()
    return render(request, 'register.html', {'form': form})

def vista_logout(request):
    if request.method == 'GET':
        logout(request)
        messages.error(request, 'Se ha cerrado la sesión')
    return redirect('index')