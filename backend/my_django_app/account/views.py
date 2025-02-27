from .serializers import UserSerializer, UserLoginSerializer,UserSerializer2,UserUpdateserializer
from .models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all() 
    serializer_class = UserSerializer
class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
        
class accountParameter(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        
        email = self.request.query_params.get('email', None)
        userRole = self.request.query_params.get('role', None)
        userPharmacyId = self.request.query_params.get('pharmacy_id', None)
        queryset = User.objects.all()
        
        if userRole is not None and userPharmacyId is not None:
            queryset = queryset.filter(role=userRole, pharmacy_id=userPharmacyId)
        elif userRole is not None:
            queryset = queryset.filter(role=userRole)
        elif userPharmacyId is not None:
            queryset = queryset.filter(pharmacy_id=userPharmacyId)
        elif email is not None:
            queryset = queryset.filter(email=email)

        return queryset
class accountUpdateParameter(generics.UpdateAPIView):
    serializer_class = UserUpdateserializer

    def get_queryset(self):
        email = self.request.query_params.get('email', None)
        queryset = User.objects.all()

        if email: 
            queryset = queryset.filter(email=email)

        return queryset 
class accountUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset=User.objects.all() 
class accountUpdate2(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer2
    queryset=User.objects.all()
class AuthUserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)

        if valid:
            status_code = status.HTTP_200_OK

            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'You have logged in successfully',
                'email': serializer.data['email'],
                'role': serializer.data['role'],
                'id': serializer.data['id'],
                'pharmacy_id': serializer.data['pharmacy_id'],
                'first_name': serializer.data['first_name'],
                'last_name': serializer.data['last_name'],
                'is_PasswordChanged': serializer.data['is_PasswordChanged'],    
               
            }
        else:
            status_code = status.HTTP_401_UNAUTHORIZED

            response = {
                'success': False,
                'statusCode': status_code,
                'message': 'Invalid email or password', }


        return Response(response, status=status_code)
# views.py
# from django.core.mail import send_mail
# from django.conf import settings
# from .models import User
# from .serializers import UserSerializer

# class ResendCodeView(generics.GenericAPIView):
#     serializer_class = UserSerializer

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()

#         # Generate a new verification code and save it to the user's profile
#         verification_code = random.randint(100000, 999999)
#         user.verification_code = verification_code
#         user.save()

#         # Send the verification code to the user's email
#         send_verification_code(user.email, verification_code)

#         return Response(status=status.HTTP_200_OK)

# # helper function to send verification code via email
# def send_verification_code(email, code):
#     subject = 'Verification Code'
#     message = f'Your verification code is: {code}'
#     from_email = settings.DEFAULT_FROM_EMAIL
#     recipient_list = [email]
#     send_mail(subject, message, from_email, recipient_list, fail_silently=False)
    
# import random
# import string

# def generate_verification_code():
#     code_length = 6  # Define the length of the verification code as per your requirement
#     characters = string.digits  # Use digits (0-9) for the verification code

#     verification_code = ''.join(random.choice(characters) for _ in range(code_length))
#     return verification_code
