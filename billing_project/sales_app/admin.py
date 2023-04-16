from django.contrib import admin
from .models import Customer
# from stocks_app.models import Product

# Register your models here.
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_id','customer_name','customer_contact','customer_address']

admin.site.register(Customer, CustomerAdmin)