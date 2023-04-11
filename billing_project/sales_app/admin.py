from django.contrib import admin
from .models import Invoice, InvoiceProduct

class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_id','invoice_number','customer']

admin.site.register(Invoice, InvoiceAdmin)


class InvoiceProductAdmin(admin.ModelAdmin):
    list_display = ['invoice_product_id','invoice','product_invoice','invoice_product_quantity']

admin.site.register(InvoiceProduct, InvoiceProductAdmin)