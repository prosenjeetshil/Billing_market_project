from django.urls import path
from . import views

urlpatterns = [
    path('fcus/', views.FakerCustomerView),
    path('fpc/', views.FakerProductCategory),
    path('fpro/', views.FakerProductView),
    path('fog/', views.add_fake_data)
]