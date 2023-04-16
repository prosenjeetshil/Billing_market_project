from wsgiref.validate import validator
from rest_framework import serializers
import re
from .models import User #,forgetPassword
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import  smart_str,force_str,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserRegistrationSerializers(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email','address','contact','city','pincode','role','password','confirm_password')

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')
        if not ( password == confirm_password):
            raise serializers.ValidationError('password and confirm password is not same')
        return super().validate(attrs)
    
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)
    
    
    # def validateEmail(email):
    #     if len(email) > 6:
    #         if re.match('\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b', email) != None:
    #             return 1
    #     return 0

class UserSerilizer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=('username','password','email')   
    def validate(self, attrs):
        email=attrs.get('email','')
        username=attrs.get('username','')
        if not username.isalnum():
            raise serializers.ValidationError('the username sholud obly alphanumeric charater only!!')
        return super().validate(attrs)

    def update(self, instance, validated_data):

        instance.set_password1(validated_data['password'])
        instance.save()

        return instance
        
class RestPasswordSerilizer(serializers.Serializer):
    email=serializers.EmailField()
    class Meta:
        fields=['email']
   
class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(min_length=6, max_length=40,write_only=True)
    token=serializers.CharField(min_length=1,write_only=True)
    uidb64=serializers.CharField(min_length=1,write_only=True)
    
    class Meta:
        fields=['password','token','uidb64']
    def validate(self, attrs):
        try:
            password=attrs.get('password')
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')
            
            id =force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=id)
            
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed('The reset link is invalid ',401)
            user.set_password(password)
            user.save()
        except Exception as e:
            pass
        return super().validate(attrs)