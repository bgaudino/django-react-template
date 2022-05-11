from django.contrib.auth import authenticate, login, logout

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            return Response({
                'message': 'Successfully logged in'
            })

        return Response({
            'message': 'Invalid email and/or password'
        }, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({
            'message': 'Successfully logged out'
        })


class WhoAmIView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            response = UserSerializer(request.user).data
            response['is_authenticated'] = True
            return Response(response)
        return Response({'is_authenticated': False})
