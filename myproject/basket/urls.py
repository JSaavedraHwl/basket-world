from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.home_view, name='index'),
    path('productos/<str:categoria>/', views.productos_view, name='productos'),
    path('quienes_somos', views.quienes_somos_view, name='quienes_somos'),
    path('pruebaplantilla', views.prueba_plantilla, name='pruebaplantilla'),
    path('obtener_productos/<str:categoria>', views.obtener_productos, name='obtener_productos')
]