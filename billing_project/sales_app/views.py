from django.http import HttpResponse
from faker import Faker
from .models import Customer
from random import randint
from stocks_app.models import Product

# Create your views here.

# implemented a view to create temporary fake customers 
def FakerCustomerView(request):
    Fake = Faker()
    customer_id = randint(10000,50000)
    customer_name = Fake.name()
    customer_contact = Fake.phone_number()
    customer_address = Fake.address()

    obj = Customer(customer_id=customer_id, customer_name=customer_name, customer_contact=customer_contact, customer_address=customer_address)
    obj.save()
    return HttpResponse("new fake customer created!")

# implemented a view to create temporary fake products 
def FakerProductView(request):
    Fake = Faker()
    product_id = randint(50000,70000)
    product_name = Fake.word()
    product_cost_per_quantity = Fake.pyfloat(left_digits=3, right_digits=2, positive=True)
    product_category = Fake.word()
    product_quantity = randint(1,100)
    product_total_cost = product_quantity * product_cost_per_quantity

    obj = Product(product_id=product_id, product_name=product_name, product_cost_per_quantity=product_cost_per_quantity, product_category=product_category, product_quantity=product_quantity,product_total_cost=product_total_cost)
    obj.save()
    return HttpResponse("new fake product created!")