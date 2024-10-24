from django.urls import path
from .views import PackageListView, packageDetailView, ItineraryListView, RegisterUser

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView




urlpatterns = [
    path('packages/', PackageListView.as_view(), name='package-list'),
    path('packages/<int:pk>', packageDetailView.as_view(), name='package-detail'),
    

    path('itinararies/',ItineraryListView.as_view(), name='itinarary-list'),


    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'), 

    path('register/', RegisterUser.as_view(), name='token_verify'),  
]