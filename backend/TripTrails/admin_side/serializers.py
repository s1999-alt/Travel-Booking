from rest_framework import serializers
from .models import Packages, Category, PackageImages, Inclusions, Exclusions, Continent, Hotels


class CategorySerializer(serializers.Serializer):
  class Meta:
    model = Category
    fields = '__all__'

  def validate_image(self, value):
    allowed_content_types = ['image/jpeg', 'image/png', 'image/gif']

    if value.content_type not in allowed_content_types:
      raise serializers.ValidationError('Invalid Image File Type. Only JPEG, PNG, and GIF are allowed')  
    return value


class PackageImageSerializer(serializers.Serializer):
  class Meta:
    model = PackageImages
    fields = ["id", "package", "image"] 


class InclusionsSerializer(serializers.Serializer):
  class Meta:
    model = Inclusions
    fields = '__all__'


class ExclusionsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Exclusions
    fields = '__all__'


class ContinentSerializer(serializers.Serializer):
  class Meta:
    model = Continent
    fields = ['continent_name']


class AdminHotelSerializer(serializers.Serializer):
  class Meta:
    model = Hotels
    fields = '__all__'



class PackageSerializer(serializers.ModelSerializer):
  images = PackageImageSerializer(many=True, read_only=True)
  inclusions = InclusionsSerializer(many=True, read_only=True)
  exclusions = ExclusionsSerializer(many=True, read_only=True) 
  hotels = AdminHotelSerializer(many=True, read_only=True)
  continent = ContinentSerializer(read_only=True)

  class Meta:
    model = Packages
    fields = '__all__'
  
  def validate_image(self, value):
    allowed_content_types = ['image/jpeg', 'image/png', 'image/gif']

    if value.content_type not in allowed_content_types:
      raise serializers.ValidationError('Invalid Image File Type. Only JPEG, PNG, and GIF are allowed')
    return value
  
  def create(self, validated_data):
    package = Packages.objects.create(**validated_data)
    return package
  
