from django.urls import path
from .models import Expenses
from .views import ExpenseAPI,ExpenseDetailAPI

urlpatterns = [
    path('exp/',ExpenseAPI.as_view()),
    path('exp/<int:pk>/',ExpenseDetailAPI.as_view()),
]