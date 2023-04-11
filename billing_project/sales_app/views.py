from rest_framework import viewsets
from .models import Customer, Invoice, InvoiceProduct
from .serializers import CustomerSerializer, InvoiceSerializer, InvoiceProductSerializer
from stocks_app.models import Product
from django.db.models import Sum
from django.contrib.auth.decorators import login_required


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class InvoiceProductViewSet(viewsets.ModelViewSet):
    queryset = InvoiceProduct.objects.all()
    serializer_class = InvoiceProductSerializer
