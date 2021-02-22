from django.db.models import Count
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from account.models import Writer
from account.serializers.writer import WriterSerializer, WriterSerializerRegister, CustomObtainPairSerializer


class WriterList(ListCreateAPIView):
    queryset = Writer.objects.all()

    serializer_class = WriterSerializer
    # permission_classes = [IsAuthenticated]


class WriterDetail(RetrieveUpdateDestroyAPIView):
    queryset = Writer.objects.all()
    serializer_class = WriterSerializer
    # permission_classes = [IsAuthenticated]


class RegisterWriter(GenericAPIView):
    serializer_class = WriterSerializerRegister

    def post(self, request, *args, **kwargs):
        serializer = WriterSerializerRegister(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomObtainPairView(TokenObtainPairView):
    serializer_class = CustomObtainPairSerializer
