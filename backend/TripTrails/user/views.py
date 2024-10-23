from django.shortcuts import render
from rest_framework import generics
from admin_side.models import Packages, Itinarary
from admin_side.serializers import PackageSerializer, ItinararySerializer

class PackageListView(generics.ListCreateAPIView):
  queryset = Packages.objects.all()
  serializer_class = PackageSerializer

  def get_queryset(self):
    return Packages.objects.filter(category__is_available = True)
  

class packageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer


class ItineraryListView(generics.ListCreateAPIView):
   serializer_class = ItinararySerializer

   def get_queryset(self):
      package_id = self.request.query_params.get('package')
      return Itinarary.objects.filter(package_id=package_id)
  






