from .models import Document, Location, Pharmacy, Drugs, Prescription, Feedbacks,PharmaRating
from rest_framework import serializers
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Document
        fields='__all__'
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Location
        fields='__all__'
class pharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = '__all__'
class PharmacySerializer(serializers.ModelSerializer):
    document = DocumentSerializer()
    location = LocationSerializer()

    class Meta:
        model = Pharmacy
        fields = '__all__'

    def create(self, validated_data):
        document_data = validated_data.pop('document')
        location_data = validated_data.pop('location')

        document = Document.objects.create(**document_data)
        location = Location.objects.create(**location_data)

        pharmacy = Pharmacy.objects.create(document=document, location=location, **validated_data)
        return pharmacy

    def update(self, instance, validated_data):
        document_data = validated_data.pop('document', {})
        location_data = validated_data.pop('location', {})
        document_serializer = self.fields['document']
        location_serializer = self.fields['location']

        # Update Pharmacy fields
        instance.name = validated_data.get('name', instance.name)
        instance.OwnersFname = validated_data.get('OwnersFname', instance.OwnersFname)
        instance.ownersLname = validated_data.get('ownersLname', instance.ownersLname)
        instance.email = validated_data.get('email', instance.email)
        instance.phoneNo = validated_data.get('phoneNo', instance.phoneNo)
        instance.licenseNo = validated_data.get('licenseNo', instance.licenseNo)
        instance.subCity = validated_data.get('subCity', instance.subCity)
        instance.kebele = validated_data.get('kebele', instance.kebele)
        instance.houseNo = validated_data.get('houseNo', instance.houseNo)
        instance.approved = validated_data.get('approved', instance.approved)
        # Include other fields of Pharmacy model

        # Update nested objects
        document_instance = instance.document
        document_instance = document_serializer.update(document_instance, document_data)

        location_instance = instance.location
        location_instance = location_serializer.update(location_instance, location_data)

        # Save updated objects
        document_instance.save()
        location_instance.save()
        instance.save()

        return instance

        
class DrugsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Drugs
        fields='__all__'
class PrecriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Prescription
        fields='__all__'
        
class PrecriptionsSerializer2(serializers.ModelSerializer):
    pharmacy=PharmacySerializer()
    class Meta:
        model=Prescription
        fields='__all__'
class FeedbacksSerializer(serializers.ModelSerializer):
    class Meta:
        model=Feedbacks
        fields='__all__'
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=PharmaRating
        fields='__all__'
        
        
#################################################################

class PharmacySerializer2(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = ('id', 'name', 'OwnersFname', 'ownersLname', 'email', 'phoneNo', 'licenseNo', 'subCity', 'kebele', 'houseNo')
class PharmacySerializer3(serializers.ModelSerializer):
    location=LocationSerializer()
    class Meta:
        model = Pharmacy
        fields = ('id', 'location','name', 'OwnersFname', 'ownersLname', 'email', 'phoneNo', 'licenseNo', 'subCity', 'kebele', 'houseNo')

class DrugSerializer2(serializers.ModelSerializer):
    pharmacy = PharmacySerializer()

    class Meta: 
        model = Drugs
        fields = ('id', 'DrugName', 'BrandName', 'GenericName', 'pharmacy')
