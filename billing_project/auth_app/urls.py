from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('login/',views.UserView.as_view(),name='login'),
    # path('email-verify/',views..as_view(),name='email-verify'),
    path('token/refersh/',TokenRefreshView.as_view(),name='token'),
    path('request-reset/',views.RequestPassword.as_view(),name='request-reset'),
    path('password-reset/<uidb64>/<token>/',views.PasswordTokenChk.as_view(),name='password-reset'),
    path('passwordreset/',views.SetNewPassword.as_view(),name='setnewpassword')
]
