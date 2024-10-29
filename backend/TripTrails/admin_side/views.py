from django.contrib.auth.models import User
from rest_framework import generics, permissions
from .serializers import UserListSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response



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





