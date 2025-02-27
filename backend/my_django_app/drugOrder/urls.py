from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import OrderList,OrderDetails,AddressList,AddressDetails,CartList,CartDetails,cartParameter,orderParameter,addressParameter
urlpatterns=[
     path('cartList/',CartList.as_view()),
     path('cartDetails/<int:pk>',CartDetails.as_view()),
     
     path('orderList/',OrderList.as_view()),
     path('orderDetails/<int:pk>',OrderDetails.as_view()),
     
     path('addressList/',AddressList.as_view()),
     path('addressDetails/<int:pk>',AddressDetails.as_view()),
     
     path('cartParameter/',cartParameter.as_view()),
     path('orderParameter/',orderParameter.as_view()),
     path('addressParameter/',addressParameter.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)