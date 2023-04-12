from django.urls import path
from .views import InvoiceProductDateRangwView

urlpatterns =[
    path('invoice_products/<str:start_date>/<str:end_date>/',InvoiceProductDateRangwView.as_view(),name='invoice_products_date_range')
]