from django.urls import path
from .views import UserListView, UserBlockUnblockView, AdminPackageListView, PackageBlockUnblockView

urlpatterns = [
  path('users/', UserListView.as_view(), name='user-list'),
  path('users/<int:user_id>/blockunblock/', UserBlockUnblockView.as_view(), name='user-block-unblock-view'),


  path('packages/', AdminPackageListView.as_view(), name='admin-packagelist'),
  path('packages/block/<int:pk>/',PackageBlockUnblockView.as_view(),name='package-block-unblock'),

]