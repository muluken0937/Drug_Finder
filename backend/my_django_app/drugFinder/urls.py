from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from .views import locationList,locationDetails,documentList,NearbyPharmacyDrugView, documentDetails,pharmacyList,pharmacyDetails,drugsList,drugsDetails,feedbackList,feedbackDetails,prescriptionList,prescriptionDetails,pharmacyParameter,drugParameter, prescriptionParameter,PharmacyDetails, RatingList,RatingDetails,NearbyPharmacyView,DeleteAllExpiredDrugs
urlpatterns=[
     path('locationList/',locationList.as_view()),
     path('locationDetails/<int:pk>',locationDetails.as_view()),
     
     path('documentList/',documentList.as_view()),
     path('documentDetails/<int:pk>',documentDetails.as_view()),
     
     path('pharmacyList/',pharmacyList.as_view()),
     path('pharmacyDetails/<int:pk>',pharmacyDetails.as_view()),
     path('pharmacyDetails2/<int:pk>',PharmacyDetails.as_view()),
     path('pharmacyParameter/',pharmacyParameter.as_view()),
     
     path('drugsList/',drugsList.as_view()),
     path('drugsDetails/<int:pk>',drugsDetails.as_view()),
     path('drugsParameter/',drugParameter.as_view()),
     
     path('feedbackList/',feedbackList.as_view()),
     path('feedbackDetails/<int:pk>',feedbackDetails.as_view()),
     
     path('ratingList/',RatingList.as_view()),
     path('RatingDetails/<int:pk>',RatingDetails.as_view()),
     
     path('prescriptionList/',prescriptionList.as_view()),
     path('prescriptionDetails/<int:pk>',prescriptionDetails.as_view()),
     path('prescriptionParameter/',prescriptionParameter.as_view()),
     
     path('nearby-drugs/', NearbyPharmacyDrugView.as_view(), name='nearby_drugs'),
     path('nearby-Pharmacy/', NearbyPharmacyView.as_view(), name='nearby_drugs'),
     
     path('delete-all-expired/', DeleteAllExpiredDrugs.as_view(), name='delete-all-expired'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)