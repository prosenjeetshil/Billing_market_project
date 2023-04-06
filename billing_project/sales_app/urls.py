from django.urls import path
from . import views

urlpatterns = [
    path('fcus/', views.FakerCustomerView),
    path('fpro/', views.FakerProductView),
]