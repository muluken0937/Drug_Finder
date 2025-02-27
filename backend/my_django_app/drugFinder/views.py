from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import generics

from .serializers import LocationSerializer,DocumentSerializer,PharmacySerializer,pharmacySerializer,DrugsSerializer,FeedbacksSerializer,PrecriptionsSerializer,RatingSerializer,PrecriptionsSerializer2,PharmacySerializer3
from .models import Location,Document,Pharmacy,Drugs,Feedbacks,Prescription,PharmaRating
# Create your views here.

class locationList(generics.ListCreateAPIView):
    queryset=Location.objects.all()
    serializer_class=LocationSerializer
class locationDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Location.objects.all()
    serializer_class=LocationSerializer
    
    
class documentList(generics.ListCreateAPIView):
    queryset=Document.objects.all()
    serializer_class=DocumentSerializer
class documentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Document.objects.all()
    serializer_class=DocumentSerializer

class pharmacyList(generics.ListCreateAPIView):
    queryset=Pharmacy.objects.all()
    serializer_class=PharmacySerializer
class pharmacyDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Pharmacy.objects.all()
    serializer_class=PharmacySerializer
class PharmacyDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Pharmacy.objects.all()
    serializer_class=pharmacySerializer
    
    
class drugsList(generics.ListCreateAPIView):
    queryset=Drugs.objects.all()
    serializer_class=DrugsSerializer
class drugsDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Drugs.objects.all()
    serializer_class=DrugsSerializer
from rest_framework import generics
from .serializers import DrugsSerializer
from .models import Drugs

from datetime import date


class drugParameter(generics.ListAPIView):
    serializer_class = DrugsSerializer

    def get_queryset(self):
        expired = self.request.query_params.get('ExpireDate', None)  # Change 'ExpireDate' to 'expired'
        pharmacy_id = self.request.query_params.get('pharmacy', None)
        drug_name = self.request.query_params.get('DrugName', None)
        Quantity = self.request.query_params.get('Quantity', None)
        category = self.request.query_params.get('Category', None)
        queryset = Drugs.objects.all()

        # Filter by Category
        if category:
            queryset = queryset.filter(Category=category)
        # Filter by Category
        if Quantity:
            queryset = queryset.filter(Quantity=Quantity)

        # Filter by pharmacy_id and drug_name
        if pharmacy_id and drug_name:
            queryset = queryset.filter(pharmacy=pharmacy_id, DrugName__icontains=drug_name)

        # Filter by pharmacy_id
        elif pharmacy_id:
            queryset = queryset.filter(pharmacy=pharmacy_id)

        # Filter by drug_name
        elif drug_name:
            queryset = queryset.filter(DrugName__icontains=drug_name)

        # Filter only expired drugs
        if expired in ['true', 'True']:
            queryset = queryset.filter(ExpireDate__lte=date.today())

        # Filter only non-expired drugs
        elif expired in ['false', 'False']:
            queryset = queryset.filter(ExpireDate__gt=date.today())

        return queryset



class feedbackList(generics.ListCreateAPIView):
    queryset=Feedbacks.objects.all()
    serializer_class=FeedbacksSerializer
class feedbackDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Feedbacks.objects.all()
    serializer_class=FeedbacksSerializer
    queryset = queryset.order_by('-created_at')
    
class prescriptionList(generics.ListCreateAPIView):
    queryset=Prescription.objects.all()
    serializer_class=PrecriptionsSerializer
class prescriptionDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Prescription.objects.all()
    serializer_class=PrecriptionsSerializer
    
class prescriptionParameter(generics.ListAPIView):
    serializer_class = PrecriptionsSerializer2

    def get_queryset(self):
        getResponse = self.request.query_params.get('getResponse', None)
        pharmacyId = self.request.query_params.get('pharmacy', None)
        userId = self.request.query_params.get('user', None)
        queryset = Prescription.objects.all()

        if getResponse is not None and pharmacyId is not None and userId is not None:
            queryset = queryset.filter(getResponse=getResponse, pharmacy=pharmacyId, user=userId)
        elif getResponse is not None and pharmacyId is not None:
            queryset = queryset.filter(getResponse=getResponse, pharmacy=pharmacyId)
        elif getResponse is not None and userId is not None:
            queryset = queryset.filter(getResponse=getResponse, user=userId)
        elif pharmacyId is not None and userId is not None:
            queryset = queryset.filter(pharmacy=pharmacyId, user=userId)
        elif getResponse is not None:
            queryset = queryset.filter(getResponse=getResponse)
        elif pharmacyId is not None:
            queryset = queryset.filter(pharmacy=pharmacyId)
        elif userId is not None:
            queryset = queryset.filter(user=userId)
        queryset = queryset.order_by('-sentDate')
        return queryset

    
class pharmacyParameter(generics.ListAPIView):
    serializer_class = PharmacySerializer

    def get_queryset(self):
        id = self.request.query_params.get('id', None)
        approve = self.request.query_params.get('approved', None)
        queryset = Pharmacy.objects.all()
        if id is not None:
            queryset = queryset.filter(id=id)
        if approve is not None:
            queryset = queryset.filter(approved=approve)
        return queryset
class RatingList(generics.ListCreateAPIView):
    
    serializer_class=RatingSerializer
    def get_queryset(self):
        pharmacy_id = self.request.query_params.get('pharmacy')
        queryset=PharmaRating.objects.all()
        if pharmacy_id:
            queryset= queryset.filter(pharmacy=pharmacy_id)
        queryset = queryset.order_by('-created_at')
        return queryset
class RatingDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=PharmaRating.objects.all()
    serializer_class=RatingSerializer

########################################################################

from math import radians, sin, cos, sqrt, atan2
from rest_framework import generics
from .models import Pharmacy, Drugs
from .serializers import DrugSerializer2

class NearbyPharmacyDrugView(generics.ListAPIView):
    serializer_class = DrugSerializer2

    def haversine_distance(self, lat1, lon1, lat2, lon2):
        # Convert degrees to radians
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        # Radius of the Earth in kilometers
        radius = 6371

        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * atan2(sqrt(a), sqrt(1-a))
        distance = radius * c

        return distance

    def get_queryset(self):
        # Get drug search query and user location parameters from the request
        drug_query = self.request.query_params.get('DrugName')
        user_latitude = self.request.query_params.get('latitude')
        user_longitude = self.request.query_params.get('longitude')

        if drug_query and user_latitude and user_longitude:
            # Case 1: If user provides both DrugName and user's current location (latitude and longitude)
            user_latitude = float(user_latitude)
            user_longitude = float(user_longitude)

            # Calculate the maximum distance for nearby pharmacies (in kilometers)
            max_distance_km = 10  # Change this value as needed

            # Filter the pharmacies that are within the specified distance from the user's location
            nearby_pharmacies = []
            for pharmacy in Pharmacy.objects.all():
                pharmacy_latitude = float(pharmacy.location.latitude)
                pharmacy_longitude = float(pharmacy.location.longitude)

                # Calculate the distance between the user and pharmacy locations
                distance_km = self.haversine_distance(user_latitude, user_longitude, pharmacy_latitude, pharmacy_longitude)

                if distance_km <= max_distance_km:
                    nearby_pharmacies.append(pharmacy)

            # Filter the drugs that match the drug search query in nearby pharmacies
            nearby_drugs = Drugs.objects.filter(DrugName=drug_query, pharmacy__in=nearby_pharmacies)

            if not nearby_drugs:
                # If no nearby pharmacy contains the drug, retrieve the drugs from all pharmacies containing the DrugName
                all_pharmacy_drugs = Drugs.objects.filter(DrugName=drug_query)

                # Sort the drugs based on their distance from the user's location (nearest first)
                all_pharmacy_drugs = sorted(all_pharmacy_drugs, key=lambda drug: self.haversine_distance(user_latitude, user_longitude, drug.pharmacy.location.latitude, drug.pharmacy.location.longitude))

                return all_pharmacy_drugs

            # Sort the drugs based on their distance from the user's location (nearest first)
            nearby_drugs = sorted(nearby_drugs, key=lambda drug: self.haversine_distance(user_latitude, user_longitude, drug.pharmacy.location.latitude, drug.pharmacy.location.longitude))

            return nearby_drugs

        elif drug_query:
            # Case 2: If user provides DrugName only
            return Drugs.objects.filter(DrugName=drug_query)

        elif user_latitude and user_longitude:
            # Case 3: If user provides user's current location (latitude and longitude) only
            user_latitude = float(user_latitude)
            user_longitude = float(user_longitude)

            # Calculate the maximum distance for nearby pharmacies (in kilometers)
            max_distance_km = 10  # Change this value as needed

            # Filter the pharmacies that are within the specified distance from the user's location
            nearby_pharmacies = []
            for pharmacy in Pharmacy.objects.all():
                pharmacy_latitude = float(pharmacy.location.latitude)
                pharmacy_longitude = float(pharmacy.location.longitude)

                # Calculate the distance between the user and pharmacy locations
                distance_km = self.haversine_distance(user_latitude, user_longitude, pharmacy_latitude, pharmacy_longitude)

                if distance_km <= max_distance_km:
                    nearby_pharmacies.append(pharmacy)

            # Retrieve all drugs for the nearby pharmacies
            nearby_drugs = Drugs.objects.filter(pharmacy__in=nearby_pharmacies)

            if not nearby_drugs:
                # If no nearby pharmacy contains the drug, return an empty queryset
                return Drugs.objects.none()

            # Sort the drugs based on their distance from the user's location (nearest first)
            nearby_drugs = sorted(nearby_drugs, key=lambda drug: self.haversine_distance(user_latitude, user_longitude, drug.pharmacy.location.latitude, drug.pharmacy.location.longitude))

            return nearby_drugs

        # Case 4: If neither DrugName nor user's current location (latitude and longitude) is provided
        # Return an empty queryset
        return Drugs.objects.none()



    


#########################################################
class NearbyPharmacyView(generics.ListAPIView):
    serializer_class = PharmacySerializer3
    def haversine_distance(self, lat1, lon1, lat2, lon2):
        # Convert degrees to radians
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        # Radius of the Earth in kilometers
        radius = 6371

        # Haversine formula
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * atan2(sqrt(a), sqrt(1-a))
        distance = radius * c

        return distance

    def get_queryset(self):
        # Get drug search query and user location parameters from the request
        user_latitude = float(self.request.query_params.get('latitude'))
        user_longitude = float(self.request.query_params.get('longitude'))

        # Calculate the maximum distance for nearby pharmacies (in kilometers)
        max_distance_km = 5  # Change this value as needed

        # Filter the pharmacies that are within the specified distance from the user's location
        nearby_pharmacies = []
        for pharmacy in Pharmacy.objects.all():
            pharmacy_latitude = float(pharmacy.location.latitude)
            pharmacy_longitude = float(pharmacy.location.longitude)

            # Calculate the distance between the user and pharmacy locations
            distance_km = self.haversine_distance(user_latitude, user_longitude, pharmacy_latitude, pharmacy_longitude)
            if distance_km <= max_distance_km:
                nearby_pharmacies.append(pharmacy)


        return nearby_pharmacies
    
from datetime import date
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Drugs
from .serializers import DrugsSerializer

class DeleteAllExpiredDrugs(generics.GenericAPIView):
    def delete(self, request, *args, **kwargs):
        today = date.today()
        pharmacy_id = self.request.query_params.get('pharmacy', None)
        if pharmacy_id:
            expired_drugs = Drugs.objects.filter(pharmacy=pharmacy_id, ExpireDate__lte=today)
            expired_drugs.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Please provide the 'pharmacy' parameter."}, status=status.HTTP_400_BAD_REQUEST)
