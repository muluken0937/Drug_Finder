from django.db import models

# Create your models here.
class Location(models.Model):
    latitude = models.DecimalField(max_digits=18, decimal_places=15)
    longitude = models.DecimalField(max_digits=18, decimal_places=15)
    def str(self): 
        return self.latitude
class Document(models.Model):
    name=models.CharField(max_length=80)
    image=models.ImageField(upload_to='documents/')
    def str(self):
        return self.name
    
class Pharmacy(models.Model):
    name=models.CharField(max_length=120, null=True)
    OwnersFname=models.CharField(max_length=50, null=True)
    ownersLname=models.CharField(max_length=50,null=True)
    email=models.CharField(max_length=100,null=True)
    phoneNo=models.CharField(max_length=14,null=True)
    licenseNo=models.CharField(max_length=30,null=True)
    subCity=models.CharField(max_length=100,null=True)
    kebele=models.CharField(max_length=100,null=True)
    houseNo=models.CharField(max_length=30,null=True)
    document=models.ForeignKey(Document, on_delete=models.CASCADE)
    location=models.ForeignKey(Location,on_delete=models.CASCADE)
    approved=models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    validDocument=models.BooleanField(default=False)
    def str(self):
        return self.name
class Drugs(models.Model):
    DrugName=models.CharField(max_length=100)
    BrandName=models.CharField(max_length=50)
    GenericName=models.CharField(max_length=50)
    Category=models.CharField(max_length=100,default=None)
    BatchNo=models.CharField(max_length=50)
    Dosage=models.CharField(max_length=100)
    Manufacturer=models.CharField(max_length=200)
    Price=models.IntegerField()
    Strength=models.CharField(max_length=20) 
    ExpireDate=models.DateField()
    ManufacturedDate=models.DateField()
    Quantity=models.IntegerField()
    additional=models.CharField(max_length=300)
    pharmacy=models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    def str(self):
        return self.DrugName
class Prescription(models.Model):
    senderName=models.CharField(max_length=100)
    drugName=models.CharField(max_length=100)
    sentDate=models.DateTimeField(auto_now_add=True)
    getResponse=models.BooleanField()
    available = models.BooleanField(default=False)
    prescriptionImage=models.ImageField(upload_to='prescriptions/')
    pharmacy=models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    user=models.CharField(max_length=100)
    def str(self):
        return self.senderName
class Feedbacks(models.Model):
    senderName=models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    pharmacyName=models.CharField(max_length=150,default=True)
    comment=models.CharField(max_length=300)
    def str(self):
        return self.senderName
class PharmaRating(models.Model):
    customer_name=models.CharField(max_length=100,null=True)
    pharmacy = models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    feedback = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)