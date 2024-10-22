from django.shortcuts import render
from rest_framework import generics
from admin_side.models import Packages
from admin_side.serializers import PackageSerializer

class PackageListView(generics.ListCreateAPIView):
  queryset = Packages.objects.all()
  serializer_class = PackageSerializer

  def get_queryset(self):
    return Packages.objects.filter(category__is_available = True)
  




