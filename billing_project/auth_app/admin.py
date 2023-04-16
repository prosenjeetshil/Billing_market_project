from django.contrib import admin
from .models import User

@admin.register(User)
class Useradmin(admin.ModelAdmin):
    list_display = ['id','address','contact','city','pincode','role']

# from django.contrib import admin
# from .models import User

# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ['id','username','first_name','email','role','is_active']