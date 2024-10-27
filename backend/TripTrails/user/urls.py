from django.urls import path
from .views import PackageListView, packageDetailView, ItineraryListView, RegisterUser, BookingDetailView, BookingListView,BookingDataView, WalletView, WalletTransactionsView, StripeCheckoutView, StripeSuccessView 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView




urlpatterns = [
    path('packages/', PackageListView.as_view(), name='package-list'),
    path('packages/<int:pk>', packageDetailView.as_view(), name='package-detail'),
    

    path('itinararies/',ItineraryListView.as_view(), name='itinarary-list'),


    path('bookings/', BookingListView.as_view(), name='booking-list'),
    path('bookings/<int:pk>', BookingDetailView.as_view(), name='booking-detail'),
    path('bookings/<int:user_id>/', BookingDataView.as_view(), name='booking-list'),

    path('create-checkout-session/',StripeCheckoutView.as_view(), name='create-checkout-session'),
    path('stripe-success/', StripeSuccessView.as_view(), name='stripe-success'),


    path('wallet/<int:user>/', WalletView.as_view(), name='wallet'),
    path('wallet/<int:user_id>/transactions/', WalletTransactionsView.as_view(), name='wallet-transactions'), 



    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'), 


    path('register/', RegisterUser.as_view(), name='token_verify'),  
]