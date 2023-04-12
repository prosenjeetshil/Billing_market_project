from rest_framework import viewsets
from .models import Customer, Invoice, InvoiceProduct
from .serializers import CustomerSerializer, InvoiceSerializer, InvoiceProductSerializer
from stocks_app.models import Product
from django.db.models import Sum
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class InvoiceProductViewSet(viewsets.ModelViewSet):
    queryset = InvoiceProduct.objects.all()
    serializer_class = InvoiceProductSerializer


class InvoiceProductDateRangeView(APIView):
    def get(self, request, start_date, end_date):
        invoice_products = InvoiceProduct.objects.filter(invoice_product_date__range=[start_date, end_date])
        total_cost = invoice_products.aggregate(Sum('invoice_product_total_cost'))['invoice_product_total_cost__sum']
        total_cost_with_offer = invoice_products.aggregate(Sum('invoice_product_total_cost_with_offer'))['invoice_product_total_cost_with_offer__sum']
        data = {
            'invoice_products': invoice_products.values(),
            'total_cost': total_cost,
            'total_cost_with_offer': total_cost_with_offer,
        }
        return Response(data)
