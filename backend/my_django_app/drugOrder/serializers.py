from rest_framework import serializers
from .models import Cart,Address,Order
from drugFinder.serializers import DrugsSerializer,pharmacySerializer
from account.serializers import UserSerializer3
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields='__all__' 
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=Address 
        fields='__all__'
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields='__all__'
class OrderSerializer2(serializers.ModelSerializer):
    drug=DrugsSerializer()
    pharmacy=pharmacySerializer()
    user=UserSerializer3()
    address=AddressSerializer()
    class Meta:
        model=Order
        fields='__all__'
class CartSerializer2(serializers.ModelSerializer):
    drug=DrugsSerializer()
    pharmacy=pharmacySerializer()
    class Meta:
        model=Cart
        fields='__all__'