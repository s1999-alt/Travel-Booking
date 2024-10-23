from django.urls import path
from .views import PackageListView, packageDetailView

urlpatterns = [
    path('packages/', PackageListView.as_view(), name='package-list'),
    path('packages/<int:pk>', packageDetailView.as_view(), name='package-detail'),
]