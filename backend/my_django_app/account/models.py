import uuid

from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from .managers import CustomUserManager

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    # These fields tie to the roles!
    ADMIN = 1
    REGISTER_OFFICER = 2
    PHARMACY_MANAGER = 3
    CUSTOMER = 4
    PHARMACIST = 5
    DELIVERER = 6
    

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (REGISTER_OFFICER, 'Register_Officer'),
        (PHARMACY_MANAGER, 'Pharmacy_Manager'),
        (CUSTOMER, 'Customer'),
        (PHARMACIST, 'Pharmacist'),
        (DELIVERER, 'Deliverer')
    )
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    # Roles created here
    uid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4, verbose_name='Public identifier')
   
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=3)
    date_joined = models.DateTimeField(auto_now_add=True)
    #phone = models.CharField(max_length=20, default='123')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True) 
    is_superuser= models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    is_PasswordChanged = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)
    modified_date = models.DateTimeField(default=timezone.now)
    created_by = models.EmailField()
    modified_by = models.EmailField()
    verification_code=models.PositiveIntegerField(blank=True, null=True)
    pharmacy_id = models.CharField(max_length=10,null=True)

    USERNAME_FIELD = 'email'
    

    objects = CustomUserManager()

    def __str__(self):
        return self.email