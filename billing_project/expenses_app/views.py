'''
from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets,status
from .serializers import ExpensesSerializer,Expenses
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class ExpenseAPI(APIView):
    def get(self,request):
        post = ExpensesSerializer.objects.all() #queryset
        serializer = ExpensesSerializer
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = ExpensesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class ExpenseDetailAPI(APIView):
    def get(self,request,pk=None):
        obj = get_object_or_404(Expenses,pk=pk)
        serializer = ExpensesSerializer(obj)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    def put(self,request,pk=None):
        obj = get_object_or_404(Expenses,pk=pk)
        serializer = ExpensesSerializer(data=request.data,instance=obj)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_205_RESET_CONTENT)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self,request,pk=None):
        obj = get_object_or_404(Expenses,pk=pk)
        serializer = ExpensesSerializer(dara=request.data,instance=obj,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_205_RESET_CONTENT)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,pk=None):
        obj = get_object_or_404(Expenses,pk=pk)
        obj.delete()
        return Response(data=None,status=status.HTTP_204_NO_CONTENT)
'''
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .serializers import ExpensesSerializer,Expenses

class ExpenseAPI(ListCreateAPIView):
    serializer_class = ExpensesSerializer
    queryset = Expenses.objects.all()

class ExpenseDetailAPI(RetrieveUpdateDestroyAPIView):
    serializer_class = ExpensesSerializer
    queryset = Expenses.objects.all()