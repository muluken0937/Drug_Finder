from django.shortcuts import render
from rest_framework import generics
from .serializers import CartSerializer,AddressSerializer,OrderSerializer2,OrderSerializer,CartSerializer2
from .models import Cart,Address,Order
# Create your views here.
class CartList(generics.ListCreateAPIView):
    queryset=Cart.objects.all()
    serializer_class=CartSerializer
class CartDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Cart.objects.all()
    serializer_class=CartSerializer
    
class AddressList(generics.ListCreateAPIView):
    queryset=Address.objects.all()
    serializer_class=AddressSerializer
class AddressDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Address.objects.all()
    serializer_class=AddressSerializer
    
class OrderList(generics.ListCreateAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
class OrderDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Order.objects.all()
    serializer_class=OrderSerializer
    
class cartParameter(generics.ListAPIView):
    serializer_class = CartSerializer2

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        pharmacy_id = self.request.query_params.get('pharmacy', None)

        queryset = Cart.objects.all()

        if user and pharmacy_id:
            queryset = queryset.filter(user=user, pharmacy=pharmacy_id)
        elif user:
            queryset = queryset.filter(user=user)
        elif pharmacy_id:
            queryset = queryset.filter(pharmacy=pharmacy_id)
 
        return queryset
from django.db.models import Q

class orderParameter(generics.ListAPIView):
    serializer_class = OrderSerializer2

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        pharmacy_id = self.request.query_params.get('pharmacy', None)
        deliverer = self.request.query_params.get('assignedDeliverer', None)
        received = self.request.query_params.get('received', None)
        paid = self.request.query_params.get('paid', None)

        queryset = Order.objects.all()

        if user:
            queryset = queryset.filter(user=user)
        if pharmacy_id:
            queryset = queryset.filter(pharmacy=pharmacy_id)
        if deliverer:
            queryset = queryset.filter(assignedDeliverer=deliverer)

        if received is not None:
            received = received.lower()
            if received == 'true':
                queryset = queryset.filter(recieved=True)
            elif received == 'false':
                queryset = queryset.filter(recieved=False)

        if paid is not None:
            paid = paid.lower()
            if paid == 'true':
                queryset = queryset.filter(paid=True)
            elif paid == 'false':
                queryset = queryset.filter(paid=False)

        queryset = queryset.order_by('-created_at')
        return queryset
class addressParameter(generics.ListAPIView):
    serializer_class = AddressSerializer

    def get_queryset(self):
        user = self.request.query_params.get('user', None)
        queryset = Address.objects.all()
        if user:
            queryset = queryset.filter(user=user)
       
        return queryset
