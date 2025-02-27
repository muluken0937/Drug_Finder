from django.db import models
from drugFinder.models import Pharmacy,Drugs
from account.models import User
# Create your models here.
class Cart(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    pharmacy=models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    drug=models.ForeignKey(Drugs, on_delete=models.DO_NOTHING)
    quantity=models.IntegerField()
    total_price=models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    def str(self):
        return self.user
class Address(models.Model):
    user=models.OneToOneField(User, unique=True,on_delete=models.CASCADE)
    Subcity=models.CharField(max_length=100)
    kebele=models.CharField(max_length=100)
    houseNo=models.CharField(max_length=50)
    phoneNo=models.CharField(max_length=20)
    loc_latitude = models.DecimalField(max_digits=18, decimal_places=15)
    loc_longitude = models.DecimalField(max_digits=18, decimal_places=15)
    def str(self):
        return self.user
class Order(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    pharmacy=models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    drug=models.ForeignKey(Drugs, on_delete=models.DO_NOTHING)
    quantity=models.IntegerField()
    total_price=models.IntegerField()
    address=models.ForeignKey(Address, on_delete=models.CASCADE)
    payMethod=models.CharField(max_length=100)
    paid = models.BooleanField(default=False)
    recieved = models.BooleanField(default=False)
    assignedDeliverer = models.CharField(max_length=20,null=True)
    validPrescription = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    prescriptionImage=models.ImageField(upload_to='prescriptions/',null=True)
    def str(self):
        return self.payMethod
    