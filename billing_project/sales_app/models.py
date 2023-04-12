from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from auth_app.models import User
from stocks_app.models import Product


# class TempUser(models.Model):
#     temp_user_id = models.BigAutoField(primary_key=True)
#     temp_user_name = models.CharField(max_length=30)

#     def __str__(self) -> str:
#         return f'{self.temp_user_name}'

class Customer(models.Model):
    customer_id = models.BigAutoField(primary_key=True)
    customer_name = models.CharField(max_length=30)
    customer_contact = PhoneNumberField(region='IN',unique = True)
    customer_address = models.TextField()

    def __str__(self) -> str:
        return f'{self.customer_name}'
    
class Invoice(models.Model):
    invoice_id = models.BigAutoField(primary_key=True)
    invoice_number = models.PositiveBigIntegerField(unique=True)
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='invoices')
    total_cost_without_gst = models.FloatField(default=0.0)
    total_cost_with_gst = models.FloatField(default=0.0)
    # invoice_created_by = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name='user',blank=True)

    def __str__(self) -> str:
        return f'{self.invoice_number}'


class InvoiceProduct(models.Model):
    invoice_product_id = models.BigAutoField(primary_key=True)
    invoice = models.ForeignKey(Invoice,on_delete=models.DO_NOTHING,related_name='product_in_invoice',blank=True)
    product_invoice = models.ForeignKey(Product,on_delete=models.DO_NOTHING,related_name='invoice_product' ,blank=True)
    invoice_product_quantity = models.PositiveIntegerField()
    invoice_product_cost_per_quantity = models.FloatField(default=0.0)
    invoice_product_total_cost = models.FloatField(default=0.0)
    invoice_product_cost_per_quantity_with_offer = models.FloatField(default=0.0)
    invoice_product_total_cost_with_gst = models.FloatField(default=0.0)
    invoice_product_total_cost_with_offer = models.FloatField(default=0.0)
    invoice_product_date = models.DateField(auto_now_add=True)
   

    def __str__(self) -> str:
        return f'{self.product_invoice}'
    
