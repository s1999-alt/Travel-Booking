from django.urls import path
from .views import UserListView,UserBlockUnblockView

urlpatterns = [
  path('users/', UserListView.as_view(), name='user-list'),
  path('users/<int:user_id>/blockunblock/', UserBlockUnblockView.as_view(), name='user-block-unblock-view'),
]