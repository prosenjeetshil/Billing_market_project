from django.contrib import admin
from .models import Customer
from stocks_app.models import Product,ProductCategory


# Register your models here.
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_id','customer_name','customer_contact','customer_address']

admin.site.register(Customer, CustomerAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_id','product_name','product_cost_per_quantity','product_category','product_quantity','product_total_cost']

admin.site.register(Product, ProductAdmin)