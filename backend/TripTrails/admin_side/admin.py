from django.contrib import admin
from .models import Category, Inclusions, Exclusions, Hotels, Continent, Destination, Packages, PackageImages, Itinarary, Booking

admin.site.register(Category)
admin.site.register(Inclusions)
admin.site.register(Exclusions)
admin.site.register(Hotels)
admin.site.register(Continent)
admin.site.register(Destination)
admin.site.register(Packages)
admin.site.register(PackageImages)
admin.site.register(Itinarary)
admin.site.register(Booking)

