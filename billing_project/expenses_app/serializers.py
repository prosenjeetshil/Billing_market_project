from rest_framework import serializers
from .models import Expenses
from django.core import validators

class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = '__all__'

        def clean_amount(self):
            data = self.cleaned_data['amount']
            if data <= 0 :
                raise validators.ValidationError('amount is invalide!!!')
            return data
