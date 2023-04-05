from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Vendor(models.Model):
    vendor_id = models.BigAutoField(primary_key=True)
    vendor_name = models.CharField(max_length=30,blank=True)
    vendor_information = models.TextField()
    vendor_contact = PhoneNumberField(region='IN')
    vendor_email = models.EmailField(blank=True)
    vendor_gst_number = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f'{self.vendor_name}'
    
class Orders(models.Model):
    order_id = models.BigAutoField(primary_key=True)
    order_number = models.CharField(unique=True,max_length=20)
    order_total_cost_without_gst = models.FloatField(default=0.0)
    order_total_cost_with_gst = models.FloatField(default=0.0)
    order_status = models.CharField(max_length=20,default='pending')
    order_delivery_date = models.DateField(blank=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE,related_name='orders')

    def __str__(self) -> str:
        return f'{self.order_number}'
    

class OrderProduct(models.Model):
    order_product_id = models.BigAutoField(primary_key=True)
    order_product = models.CharField(max_length=30)
    order_product_quantity = models.PositiveIntegerField()
    order_product_cost_per_quantity = models.FloatField(blank=True)
    order_product_total_cost = models.FloatField(blank=True)
    order_product_total_cost_with_gst = models.FloatField(blank=True)
