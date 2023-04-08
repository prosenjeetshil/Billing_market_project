from rest_framework import serializers
from .models import Customer, Invoice, InvoiceProduct
from stocks_app.serializers import ProductSerializer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class InvoiceProductSerializer(serializers.ModelSerializer):
    # product_invoice = ProductSerializer(many=True)

    class Meta:
        model = InvoiceProduct
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    # product_in_invoice = ProductSerializer(many=True)
    # products_invoice = InvoiceProductSerializer(many=True)

    class Meta:
        model = Invoice
        fields = '__all__'


