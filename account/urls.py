from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from account.views import WriterDetail, WriterList, RegisterWriter, CustomObtainPairView

urlpatterns = [
    path(f"writer", WriterList.as_view(), name="writer-list"),
    path(f"writer/<int:pk>", WriterDetail.as_view(), name="writer-detail"),

    path(f"auth/create", RegisterWriter.as_view(), name="create_user"),
    path(f"auth/login", CustomObtainPairView.as_view(), name="token_obtain_pair"),
    path(f"auth/refresh", TokenRefreshView.as_view(), name="token_refresh"),
]
