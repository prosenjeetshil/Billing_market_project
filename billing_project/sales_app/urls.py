from django.urls import path
from .views import InvoiceProductDateRangeView

urlpatterns = [
    path('invoice-products/<str:start_date>/<str:end_date>/', InvoiceProductDateRangeView.as_view(), name='invoice_products_date_range'),
]
