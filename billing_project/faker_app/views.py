from django.http import HttpResponse
from faker import Faker
from sales_app.models import Customer
from random import randint
from stocks_app.models import Offers, GST, Product, ProductCategory

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



def FakerProductCategory(request):
    Fake = Faker()
    product_category_id = randint(1,100)
    product_category_name = Fake.word()

    obj = ProductCategory(product_category_id=product_category_id, product_category_name=product_category_name)
    obj.save()
    return HttpResponse("new fake product category created!")

# implemented a view to create temporary fake products 
def FakerProductView(request):
    Fake = Faker()
    product_id = randint(50000,70000)
    product_name = Fake.word()
    product_cost_per_quantity = Fake.pyfloat(left_digits=3, right_digits=2, positive=True)
    product_category = ProductCategory.objects.order_by('?').first()
    product_quantity = randint(1,100)
    product_total_cost = product_quantity * product_cost_per_quantity
    product_offers = Offers.objects.order_by('?').first()
    product_gst = GST.objects.order_by('?').first()

    obj = Product(product_id=product_id, product_name=product_name, product_cost_per_quantity=product_cost_per_quantity,product_offers=product_offers,product_gst=product_gst, product_category=product_category, product_quantity=product_quantity,product_total_cost=product_total_cost)
    obj.save()
    return HttpResponse("new fake product created!")

def add_fake_data(request):
    # Create a Faker object
    fake = Faker()

    # Generate fake data and insert it into the database
    for i in range(5):
        # Generate fake offers data
        offer_name = fake.word()
        offer_description = fake.sentence()
        offer_in_percentile = 0
        while offer_in_percentile == 0:
            offer_in_percentile = fake.pyfloat(left_digits=2, right_digits=2, positive=True, max_value=100)
        offer_in_rupees = fake.pyfloat(left_digits=3, right_digits=2, positive=True)
        offer_start_date = fake.date_between(start_date='-1y', end_date='+1y')
        offer_end_date = fake.date_between(start_date=offer_start_date, end_date='+1y')

        # Create the offers object and save it to the database
        offers = Offers(offer_name=offer_name,
                        offer_description=offer_description,
                        offer_in_percentile=offer_in_percentile,
                        offer_in_rupees=offer_in_rupees,
                        offer_start_date=offer_start_date,
                        offer_end_date=offer_end_date)
        offers.save()

        # Generate fake GST data
        hsn_code = fake.random_int(min=1000, max=9999)
        cgst = fake.pyfloat(left_digits=1, right_digits=2, positive=True)
        sgst = fake.pyfloat(left_digits=1, right_digits=2, positive=True)
        igst = fake.pyfloat(left_digits=1, right_digits=2, positive=True)

        # Create the GST object and save it to the database
        gst = GST(hsn_code=hsn_code,
                  cgst=cgst,
                  sgst=sgst,
                  igst=igst)
        gst.save()

    # Return a success message
    return HttpResponse("Fake data has been added to the database.")