from django.db import models
from django.core import validators

class Expenses(models.Model):
    #category = models.ForeignKey(ExpenseCategory, on_delete=models.DO_NOTHING)
    expenseID = models.PositiveIntegerField(primary_key=True)
    #description = models.TextField(max_length=100,unique=True)
    amount = models.FloatField(verbose_name='amount',validators=[validators.MinValueValidator(1)])
    #created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    #created_by = models.ForeignKey()
    created_at = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.expenseID
