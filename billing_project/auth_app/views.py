from rest_framework.response import Response
from rest_framework.views import status,APIView
from django.contrib.auth import authenticate
from rest_framework import viewsets
from .serializers import User,UserRegistrationSerializers,UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .utils import Send_Mail
from rest_framework import generics
from .serializers import UserSerilizer,User,RestPasswordSerilizer,SetNewPasswordSerializer#,ForgetPasswordSerilizer #,forgetPassword
from . utils import Util
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import  smart_str,force_str,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.utils.encoding import *
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
import os


class UserViewset(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        resp =  super().create(request, *args, **kwargs)

        user_email = resp.data.get('email')
        subject = 'Add Employee.'
        username = resp.data.get('username')
        password = resp.data.get('password')
        context = {'user_email':user_email,'username':username}
        body =f"You've added successfully in our staff members.Your username is: {username} and password is: {password} " 
        Send_Mail.send_mail(subject=subject,body=body,to=[user_email])
        return resp

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializers(data=request.data)
        if serializer.is_valid():
            data = serializer.save()
            return Response(data=data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request, format=None):
        serializer = UserRegistrationSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({'msg':'Registration Successfull'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes=[os.environ.get('App_SCHEME'),'http','https']



class UserView(generics.ListCreateAPIView):
    serializer_class=UserSerilizer
    queryset=User.objects.all()
   
    # authentication_classes=[TokenAuthentication]
    # permission_classes=[IsAuthenticated]
    # def post(self, request):
    #     user=request.data
    #     serilzer=self.serializer_class(data=user)
    #     serilzer.is_valid(raise_exception=True)
    #     serilzer.save()
    #     user_data=serilzer.data
    #     user=User.objects.filter(email=user_data['email'])
    #     token=RefreshToken.for_user(user).access_token
    #     relative_link=reverse('verify')
    #     Currnt_site=get_current_site(request)
        
    #     absurl='http://'+Currnt_site+relative_link+"?token="+token
    #     email_body="hii"+user.username+" use Bleow link to reset\n"+absurl
    #     data={'email_body':email_body,'to_email':user.email,'email_subjct':'Verify your email'}
    #     Util.send_mail(data)
            
    #     return Response(user_data,status=status.HTTP_200_OK)
            
    
    # def create(self, request, *args, **kwargs):
    #     resp =  super().create(request, *args, **kwargs)
    #     user=User.objects.get(email=['email'])
    #     token=RefreshToken.for_user(user).access_token
    #     relative_link=reverse('verify')
    #     Currnt_site=get_current_site(request)
       
    #     absurl='http://'+Currnt_site+relative_link+"?token="+token
    #     email_body="hii"+user.username+" use Bleow link to reset\n"+absurl
    #     data={'email_body':email_body,'to_email':user.email,'email_subjct':'Verify your email'}
    #     Util.send_mail(data)
    #     return resp
        
    
# class ForgetPasswordView(viewsets.ModelViewSet):
#     serializer_class=ForgetPasswordSerilizer
#     queryset=forgetPassword.objects.all()
    
 

        # user_email = resp.data.get('email1')
        # subject = 'Update_Password'
        # # context = {'user_email':user_email,'username':username}
        # body ="Click on Below Link to confrim your password " 
        # SendMail.send_mail(subject=subject,body=body,to=[user_email])
        # return resp
        
class RequestPassword(generics.GenericAPIView):
    
    serializer_class=RestPasswordSerilizer
    def post(self,request):
        serialzer=self.serializer_class(data=request.data)
        
        email=request.data['email']
        if User.objects.filter(email=email).exists():
                user=User.objects.get(email=email)
                uidb64=urlsafe_base64_encode(str(user.id).encode())
                token =PasswordResetTokenGenerator().make_token(user)
                relative_link=reverse('password-reset',kwargs={'uidb64':uidb64,'token':token})
                Currnt_site=get_current_site(request=request).domain
                
                redirect_url=('http://localhost:3000/update/username/')
                absurl='http://'+Currnt_site + relative_link
                email_body="Hellooo,use Bleow link to reset Your Password  \n"+absurl+"?redirect_url="+ redirect_url
                data={'email_body':email_body,'to_email':user.email,'email_subject':'Reset your email'}
                Util.send_mail(data)
        
      
        return Response({'success':'we have send you link yo reset data'},status=status.HTTP_200_OK)
       
        
class PasswordTokenChk(generics.GenericAPIView):
    serializer_class=SetNewPasswordSerializer
    def get(self,request,uidb64,token):
        redirect_url=request.GET.get('redirect_url')
        try:
            id=smart_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=id)
            if  not PasswordResetTokenGenerator().check_token(user,token):  
                
                if  len(redirect_url)>3:
                    
                    return CustomRedirect (redirect_url+'?token_valid=False')            
                # return Response({'errors':'Token is not valid plese request new one'},status=status.HTTP_401_UNAUTHORIZED)
                else:
                    return CustomRedirect(os.environ.get ('FRONTEND_URL')+'?token_valid=False')            

         
               
            return CustomRedirect(redirect_url +'?token_valid=True&?message=Credential Valid&?uidb64='+uidb64+'&?token='+token)
        except DjangoUnicodeDecodeError as identifer:
            if  not PasswordResetTokenGenerator().check_token(user):
                 return CustomRedirect (redirect_url +'?token_valid=False')    
                  
class SetNewPassword(generics.GenericAPIView):
    serializer_class=SetNewPasswordSerializer
    
    def patch(self,request):
        serilaizer=self.serializer_class(data=request.data) 
        
        serilaizer.is_valid(raise_exception=True)
        return Response({'success':True,'message':'password reset success'},status=status.HTTP_200_OK)