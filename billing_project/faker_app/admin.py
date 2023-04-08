from django.contrib import admin
from sales_app.models import Customer
from stocks_app.models import Product,ProductCategory,Offers,GST

# from stocks_app.models import Product

# Register your models here.
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_id','customer_name','customer_contact','customer_address']

admin.site.register(Customer, CustomerAdmin)

class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['product_category_id','product_category_name']

admin.site.register(ProductCategory, ProductCategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_id','product_name','product_cost_per_quantity','product_category','product_quantity','product_total_cost']

admin.site.register(Product, ProductAdmin)

class OffersAdmin(admin.ModelAdmin):
    list_display = ['offer_id', 'offer_name']

admin.site.register(Offers, OffersAdmin)

class GSTAdmin(admin.ModelAdmin):
    list_display = ['gst_id', 'hsn_code']

admin.site.register(GST, GSTAdmin)
