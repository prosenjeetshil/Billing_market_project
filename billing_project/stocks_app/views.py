from rest_framework import viewsets
from .models import Offers, GST, ProductCategory, Product
from .serializers import OffersSerializer, GSTSerializer, ProductCategorySerializer, ProductSerializer


class OffersViewSet(viewsets.ModelViewSet):
    queryset = Offers.objects.all()
    serializer_class = OffersSerializer


class GSTViewSet(viewsets.ModelViewSet):
    queryset = GST.objects.all()
    serializer_class = GSTSerializer


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer