from django.urls import path
from .views import UserListView, UserBlockUnblockView, AdminPackageListView, PackageBlockUnblockView, ContinentListView, PackageCreateView, CategoryListView, InclusionListView, ExclusionListView, AdminHotelCreateView, AdminHotelListView

urlpatterns = [
  path('users/', UserListView.as_view(), name='user-list'),
  path('users/<int:user_id>/blockunblock/', UserBlockUnblockView.as_view(), name='user-block-unblock-view'),


  path('packages/', AdminPackageListView.as_view(), name='admin-packagelist'),
  path('packages/create/', PackageCreateView.as_view(), name='package-create'),
  path('packages/block/<int:pk>/',PackageBlockUnblockView.as_view(),name='package-block-unblock'),


  path('continents/',ContinentListView.as_view(),name='continent-list'),

  path('categories/list/', CategoryListView.as_view(), name='category-list'),

  path('inclusions/', InclusionListView.as_view(), name='inclusions-list'),
  path('exclusions/', ExclusionListView.as_view(), name='exclusions-list'),

  path('hotels/create/', AdminHotelCreateView.as_view(), name='hotels-create'),
  path('hotels/list/', AdminHotelListView.as_view(), name='hotels-list'),


]

