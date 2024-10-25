from django.shortcuts import render
from rest_framework import generics
from admin_side.models import Packages, Itinarary, Booking, Wallet, WalletTransaction
from admin_side.serializers import PackageSerializer, ItinararySerializer, BookingSerializer, WalletSerializer, WalletTransactionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.conf import settings
from django.contrib.auth.models import User
from django.db import transaction
from django.shortcuts import redirect
import stripe


class RegisterUser(APIView):
  permission_classes = [AllowAny]
  def post(self, request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
  
   

class PackageListView(generics.ListCreateAPIView):
  queryset = Packages.objects.all()
  serializer_class = PackageSerializer

  def get_queryset(self):
    return Packages.objects.filter(category__is_available = True)
  

class packageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]


class ItineraryListView(generics.ListCreateAPIView):
   serializer_class = ItinararySerializer

   def get_queryset(self):
      package_id = self.request.query_params.get('package')
      return Itinarary.objects.filter(package_id=package_id)


class BookingListView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
   queryset = Booking.objects.all()
   serializer_class = BookingSerializer

   def update(self, request, *args, **kwargs):
      instance = self.get_object()
      data = request.data

      if 'status' in data and 'booking_status' in data:
         instance.status = data['status']
         instance.booking_status = data['booking_status']
         instance.save()
         return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)
      else:
        return Response({'error': 'Missing status or booking_status in request data'}, status=status.HTTP_400_BAD_REQUEST)


class BookingDataView(generics.ListAPIView):
    serializer_class = BookingSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Booking.objects.filter(user_id=user_id)
    

class WalletView(generics.RetrieveAPIView):
  queryset = Wallet.objects.all()
  serializer_class = WalletSerializer
  lookup_field = 'user'


  def put(self, request, *args, **kwargs):
    instance = self.get_object()
    data = request.data

    if 'balance' in data:
      old_balance = instance.balance
      new_balance = data['balance']

      instance.balance = new_balance
      instance.save()

      if new_balance != old_balance:
        transaction_type = 'Credit' if new_balance > old_balance else 'Debit'
        amount = abs(new_balance - old_balance)
        WalletTransaction.objects.create(
          user = instance.user,
          amount = amount,
          transaction_type = transaction_type 
        )

      return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)
    else:
      return Response({'error': 'Missing balance in request data'}, status=status.HTTP_400_BAD_REQUEST)


class WalletTransactionsView(generics.ListAPIView):
    serializer_class = WalletTransactionSerializer

    def get_queryset(self):
        user_id = self.kwargs['id']
        return WalletTransaction.objects.filter(user=user_id)
    

stripe.api_key = settings.STRIPE_SECRET_KEY
class StripeCheckoutView(APIView):
  User = get_user_model()
  def post(self, request):
    try:
      user_id = request.data.get('user_id')
      booking_id = request.data.get('booking_id')
      print("--------------------------------------------------")
      booking = Booking.objects.get(id=booking_id)
      package = booking.package
      image_url = request.build_absolute_uri(package.image.url)

      if booking.status == 'Payment Complete':
          return Response(
            {'warning' : 'This booking has already been paid for..'},
            status=status.HTTP_400_BAD_REQUEST
          )
     

      if request.data.get('use_wallet'):
        user_id = request.data.get('user_id')
        user = User.objects.get(id=user_id)
        wallet = Wallet.objects.get(user=user)

        if wallet.balance >= booking.total:
          with transaction.atomic():
            booking.status = 'Payment Complete'
            booking.payment_method = 'Wallet'
            booking.wallet_paid = booking.total
            booking.save()
            wallet.balance -= booking.total
            wallet.save()
            amount = booking.total
            transaction_type = 'Debit'
            WalletTransaction.objects.create(
              user=user,
              amount=amount,
              transaction_type=transaction_type
            )
          return redirect('http://localhost:5173/success?success=true') 
        
        else:
          amount_used_from_wallet = wallet.balance
          booking.wallet_paid = amount_used_from_wallet
          booking.save()

          booking.total -= wallet.balance 
          booking.payment_method = 'Stripe'

          checkout_session = stripe.checkout.Session.create(
            line_items=[
              {
                'price_data' : {
                    'currency': 'inr',
                    'product_data':{
                        'name': package.package_name,
                        'images': [image_url],
                    },
                    'unit_amount': int(booking.total * 100),
                },
                'quantity': 1,
              },
            ],
            payment_method_types=['card'],
            mode='payment',
            success_url='http://localhost:8000/api/user/stripe-success/?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=settings.SITE_URL + '/?canceled=True',
            customer_email=booking.email,
            billing_address_collection='required',
            payment_intent_data={
              'description': f'Booking ID: {booking.id}',
            },
            metadata={
              'booking_id': booking.id,
            },
          )

          return redirect(checkout_session.url)
      
      else:
        checkout_session = stripe.checkout.Session.create(
          line_items=[
            {
                'price_data' : {
                    'currency': 'inr',
                    'product_data':{
                        'name': package.package_name,
                        'images': [image_url],
                    },
                    'unit_amount': int(booking.total * 100),
                },
                'quantity': 1,
            },
          ],
          payment_method_types=['card'],
          mode='payment',
          success_url='http://localhost:8000/api/user/stripe-success/?session_id={CHECKOUT_SESSION_ID}',
          cancel_url=settings.SITE_URL + '/?canceled=True',
          customer_email=booking.email,
          billing_address_collection='required',
          payment_intent_data={
              'description': f'Booking ID: {booking.id}',
          },
          metadata={
              'booking_id': booking.id,
          },

        )
        return redirect(checkout_session.url) 
      
    except Exception as e:
      print(f"Error in StripeCheckoutView: {str(e)}")
      return Response(
          {'error':'something went wrong....'},
          status=status.HTTP_500_INTERNAL_SERVER_ERROR
      )    



class StripeSuccessView(APIView):
    def get(self, request):
        try:
            session_id = request.GET.get('session_id')

            print("====================",session_id)
            # Retrieve the session from Stripe to confirm payment success
            session = stripe.checkout.Session.retrieve(session_id)

            # Get the booking ID from the session's metadata
            booking_id = session.metadata.get('booking_id')

            print("==========================",booking_id)
            
            # Update the booking status to 'Payment Complete'
            with transaction.atomic():
                booking = Booking.objects.get(id=booking_id)
                booking.status = 'Payment Complete'
                booking.payment_method = 'Stripe'
                booking.save()    

            return redirect('http://localhost:5173/success?success=true') 

        except stripe.error.StripeError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 


     
  






