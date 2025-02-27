from django.db import models

# Create your models here.
class Location(models.Model):
    latitude=models.DecimalField(max_digits=20,decimal_places=20)
    longitude=models.DecimalField(max_digits=20,decimal_places=20)
    def str(self):
        return self.latitude
class Document(models.Model):
    name=models.CharField(max_length=80)
    image=models.ImageField(upload_to='documents/')
    def str(self):
        return self.name
    
class Pharmacy(models.Model):
    name=models.CharField(max_length=120)
    OwnersFname=models.CharField(max_length=50)
    ownersLname=models.CharField(max_length=50)
    email=models.CharField(max_length=100)
    phoneNo=models.CharField(max_length=14)
    licenseNo=models.CharField(max_length=30)
    subCity=models.CharField(max_length=100)
    kebele=models.CharField(max_length=100)
    houseNo=models.CharField(max_length=30)
    document=models.ForeignKey(Document, on_delete=models.CASCADE)
    location=models.ForeignKey(Location,on_delete=models.CASCADE)
    approved=models.BooleanField()
    def str(self):
        return self.name
class Drugs(models.Model):
    DrugName=models.CharField(max_length=100)
    BrandName=models.CharField(max_length=50)
    GenericName=models.CharField(max_length=50)
    BatchNo=models.CharField(max_length=50)
    Dosage=models.CharField(max_length=100)
    Manufacturer=models.CharField(max_length=200)
    Price=models.IntegerField()
    Strength=models.CharField(max_length=20)
    ExpireDate=models.DateField()
    ManufacturedDate=models.DateField()
    Quantity=models.IntegerField()
    additional=models.CharField(max_length=300)
    pharmacy=models.ForeignKey(Pharmacy, on_delete=models.PROTECT)
    def str(self):
        return self.DrugName
class User(models.Model):
    Fname=models.CharField(max_length=50)
    Lname=models.CharField(max_length=50)
    email=models.EmailField(max_length=100)
    phoneNumber=models.CharField(max_length=14)
    def str(self):
        return self.Fname
class Account(models.Model):
    userName=models.CharField( max_length=50)
    password=models.CharField(max_length=50)
    role=models.CharField(max_length=100)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    phamacy=models.ForeignKey(Pharmacy, on_delete=models.PROTECT)
    blockStatus=models.BooleanField()
    def str(self):
        return self.userName
    
class Prescription(models.Model):
    senderName=models.CharField(max_length=100)
    drugName=models.CharField(max_length=100)
    sentDate=models.DateField()
    getResponse=models.BooleanField()
    prescriptionImage=models.ImageField(upload_to='documents/')
    pharmacy=models.ForeignKey(Pharmacy, on_delete=models.PROTECT)
    user=models.ForeignKey(User,on_delete=models.PROTECT)
    def str(self):
        return self.senderName
class Feedbacks(models.Model):
    senderName=models.CharField(max_length=100)
    sentDate=models.DateField()
    pharmacyName=models.CharField(max_length=100)
    comment=models.CharField(max_length=300)
    def str(self):
        return self.senderName
