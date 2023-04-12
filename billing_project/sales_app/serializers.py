from rest_framework import serializers
from .models import Customer, Invoice, InvoiceProduct
from stocks_app.serializers import ProductSerializer


class InvoiceProductSerializer(serializers.ModelSerializer):
    product_name = ProductSerializer(many=True,read_only = True)
   
    class Meta:
        model = InvoiceProduct
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    product_in_invoice = InvoiceProductSerializer(many=True, read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    invoices = InvoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Customer
        fields = '__all__'




