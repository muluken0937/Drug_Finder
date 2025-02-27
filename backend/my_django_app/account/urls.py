from django.urls import path
from .views import UserList, AuthUserLoginView,accountParameter,accountUpdate,accountUpdate2,accountUpdateParameter

urlpatterns = [
    path('registerParameter/', accountParameter.as_view(),name='Register parameter'),
    path('register/', UserList.as_view(),name='Register'),
    path('registerDetails/<int:pk>', accountUpdate2.as_view(),name='Update'),
    path('login/', AuthUserLoginView.as_view(),name='Login'),
    path('accountDetails/<int:pk>',accountUpdate.as_view()), 
    path('accountUpdate/',accountUpdateParameter.as_view()),
   # path('resend-code/', ResendCodeView.as_view(), name='resend-code')
]