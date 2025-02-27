from .models import User
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name','role','email','password','pharmacy_id','is_staff','is_superuser','is_PasswordChanged']
    def create(self, validated_data):
        # Create a new user with a hashed password
        auth_user = User.objects.create_user(**validated_data)
        return auth_user   
class UserUpdateserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','password','is_PasswordChanged']

    
class UserSerializer3(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['id','first_name','last_name','role','pharmacy_id','is_PasswordChanged']
        
from django.contrib.auth.hashers import make_password
class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'role', 'pharmacy_id', 'is_PasswordChanged', 'password']

    def update(self, instance, validated_data):
        # Check if the 'password' field is present in the validated_data
        if 'password' in validated_data:
            # Hash the new password using make_password
            instance.password = make_password(validated_data['password'])
            # Remove the 'password' key from validated_data so it doesn't get saved as plain text
            del validated_data['password']

        # Update the other fields as usual
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)
    id = serializers.CharField(read_only=True)
    pharmacy_id=serializers.CharField(read_only=True)
    first_name=serializers.CharField(read_only=True)
    last_name=serializers.CharField(read_only=True)
    is_PasswordChanged=serializers.BooleanField(read_only=True)

    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            validation = {
                'email': user.email,
                'password': user.password,
                'role': user.role,
                'id': user.id,
                'pharmacy_id': user.pharmacy_id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_PasswordChanged':user.is_PasswordChanged,
                 }

            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")