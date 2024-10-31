from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserListSerializer, CategorySerializer, PackageSerializer, AdminPackageListSerializer, ContinentSerializer, InclusionsSerializer, ExclusionsSerializer, AdminHotelSerializer, PackageImageSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import Packages, Category, Continent, Inclusions, Exclusions, Hotels, PackageImages



#User Listing View in AdminSide
class UserListView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserListSerializer
  # permission_classes = [permissions.IsAdminUser]

#User Block/Unblock View in AdminSide
class UserBlockUnblockView(APIView):
  # permission_classes = [permissions.IsAdminUser]
  def post(self, request, user_id):
    try:
      user = User.objects.get(id=user_id)
      user.is_active = not user.is_active
      user.save()
      return Response({'status':'success', 'is_active': user.is_active}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
      return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    




#category List view in admin side
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

#category creating view in admin side
class CategoryCreateView(generics.CreateAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data = request.data)
    serializer.is_valid(raise_exception = True)

    category_image = request.data.get('category_image')
    if category_image:
      if not category_image.content_type.startswith('image'):
        return Response({'category_image': ['Invalid image format. Only images are allowed.']}, status=status.HTTP_400_BAD_REQUEST)
    
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

#category Block and Unblock view in admin side
class CategoryBlockUnblockView(generics.RetrieveUpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [IsAuthenticated]
                    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_available = not instance.is_available
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

#Category update and fetch with 'id' view in admin side
class CategoryUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
  




#Continent Listing View in Admin side
class ContinentListView(generics.ListAPIView):
  queryset = Continent.objects.all()
  serializer_class = ContinentSerializer





#Packages Listing View in AdminSide
class AdminPackageListView(generics.ListAPIView):
  queryset = Packages.objects.all()
  serializer_class = AdminPackageListSerializer

#Package Create View in AdminSide
class PackageCreateView(generics.CreateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer 

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = request.data.get('image')
        if image:
            if not image.content_type.startswith('image'):
                return Response({'image': ['Invalid image format. Only images are allowed.']}, status=status.HTTP_400_BAD_REQUEST)
            
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers) 

#packages update/edit in admin side view
class PackageUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer 

#Packages Block and UnBlock View in AdminSide
class PackageBlockUnblockView(generics.RetrieveUpdateAPIView):
    queryset = Packages.objects.all()
    serializer_class = PackageSerializer

    def update(self, request, *args, **kwargs):
      instance = self.get_object()
      instance.is_active = not instance.is_active
      instance.save()
      serializer = self.get_serializer(instance)
      return Response(serializer.data, status=status.HTTP_200_OK)

#Package-images add View in AdminSide
class PackageImageCreateView(generics.CreateAPIView):
   queryset = PackageImages.objects.all()
   serializer_class = PackageImageSerializer

   def create(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)  
   




#inclusions and exclusions list view
class InclusionListView(generics.ListAPIView):
    queryset = Inclusions.objects.all()
    serializer_class = InclusionsSerializer  

class ExclusionListView(generics.ListAPIView):
    queryset = Exclusions.objects.all()
    serializer_class = ExclusionsSerializer





#Admin side hotel create, list , and update/edit views
class AdminHotelCreateView(generics.CreateAPIView):
    queryset = Hotels.objects.all()
    serializer_class = AdminHotelSerializer

class AdminHotelListView(generics.ListAPIView):
    queryset = Hotels.objects.all()
    serializer_class = AdminHotelSerializer

class AdminHotelUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset =  Hotels.objects.all()  
    serializer_class = AdminHotelSerializer



