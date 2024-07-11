from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.home_view, name='index'),
    path('productos/<str:categoria>/', views.productos_view, name='productos'),
    path('quienes_somos', views.quienes_somos_view, name='quienes_somos'),
    path('pruebaplantilla', views.prueba_plantilla, name='pruebaplantilla'),
    path('obtener_productos/<str:categoria>', views.obtener_productos, name='obtener_productos'),
    path('crud_productos', views.crud_productos, name='crud_productos'),
    path('agregar_productos', views.agregar_producto, name='agregar_productos'),
    path('editar_producto/<str:id>/', views.editar_producto, name='editar_producto'),
    path('eliminar_producto/<str:id>', views.eliminar_producto, name='eliminar_producto'),
    path('login', views.vista_login, name='login'),
    path('register', views.register, name='register'),
]