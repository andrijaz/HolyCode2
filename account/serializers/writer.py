from rest_framework import serializers

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from account.models import Writer
User = get_user_model()


class WriterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Writer
        fields = "__all__"


class WriterSerializerRegister(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username", "password", "is_editor"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def save(self, **kwargs):
        writer = Writer(
            email=self.validated_data["email"],
            username=self.validated_data["username"],
            is_active=True,
            is_editor=self.validated_data["is_editor"]
        )
        password = self.validated_data["password"]
        writer.set_password(password)
        writer.save()

        return writer
class CustomObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["is_editor"] = user.is_editor
        return token
