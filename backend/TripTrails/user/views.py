from django.shortcuts import render
from rest_framework import generics
from admin_side.models import Packages, Itinarary
from admin_side.serializers import PackageSerializer, ItinararySerializer
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
  






