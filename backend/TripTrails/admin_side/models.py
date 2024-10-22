from django.db import models


class Category(models.Model):
  category_name = models.CharField( max_length=50, unique=True )
  is_available = models.BooleanField(default=True)
  soft_deleted = models.BooleanField(default=False)
  category_image = models.ImageField(upload_to='category_images/', blank=True, null=True)

  def __str__(self):
    return self.category_name
  

class Inclusions(models.Model):
  inclusion = models.CharField(max_length=100)

  def __str__(self):
    return self.inclusion
  

class Exclusions(models.Model):
  exclusion = models.CharField(max_length=100) 

  def __str__(self):
    return self.exclusion


class Hotels(models.Model):
  hotel_name = models.CharField(max_length=50)
  place = models.CharField(max_length=50)
  hotel_overview = models.TextField()
  hotel_image = models.ImageField(upload_to="hotel_images/", default="",null=True, blank=True)
  is_available = models.BooleanField(default=True)

  def __str__(self):
    return self.hotel_name
  

class Continent(models.Model):
  continent_name = models.CharField(max_length=50)

  def __str__(self):
    return self.continent_name


class Destination(models.Model):
  destination_name = models.CharField(max_length=50)
  country = models.CharField(max_length=50)
  continent = models.ForeignKey(Continent, on_delete=models.CASCADE)
  description = models.TextField()
  image = models.ImageField(upload_to='package_images/', blank=True, null=True)


class Packages(models.Model):
  package_name = models.CharField(max_length=50, unique=True)
  duration = models.CharField(max_length=50)
  price = models.DecimalField(max_digits=10, decimal_places=2) 
  sale_price = models.DecimalField(max_digits=10, decimal_places=2)
  overview = models.TextField()
  category = models.ForeignKey(Category,on_delete=models.CASCADE)
  continent = models.ForeignKey(Continent, on_delete=models.CASCADE)
  image = models.ImageField(upload_to='package_images/', blank=True, null=True)
  city = models.CharField(max_length=50)
  country = models.CharField(max_length=50,blank=True)
  rating = models.DecimalField(max_digits=5, decimal_places=2)
  inclusions = models.ManyToManyField(Inclusions, blank=True)
  exclusions = models.ManyToManyField(Exclusions, blank=True)
  hotels = models.ManyToManyField(Hotels, blank=True)
  is_active = models.BooleanField(default=False)

  def __str__(self):
    return self.package_name
  

class PackageImages(models.Model):
  package = models.ForeignKey(Packages, related_name='images', on_delete=models.CASCADE)
  image = models.ImageField(upload_to="package_images/", default="", null=True, blank=True)


class Itinarary(models.Model):
  package = models.ForeignKey(Packages , on_delete=models.CASCADE)
  day_number = models.PositiveIntegerField()
  activities = models.TextField()

  def __str__(self):
    return f"{self.package.package_name} - Day{self.day_number}"
