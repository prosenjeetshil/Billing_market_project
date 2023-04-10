from rest_framework import viewsets
from .models import Customer, Invoice, InvoiceProduct
from .serializers import CustomerSerializer, InvoiceSerializer, InvoiceProductSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class InvoiceProductViewSet(viewsets.ModelViewSet):
    queryset = InvoiceProduct.objects.all()
    serializer_class = InvoiceProductSerializer
