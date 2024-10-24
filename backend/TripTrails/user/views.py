from django.shortcuts import render
from rest_framework import generics
from admin_side.models import Packages, Itinarary, Booking
from admin_side.serializers import PackageSerializer, ItinararySerializer, BookingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


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
  






