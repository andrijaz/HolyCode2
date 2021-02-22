from datetime import timedelta, datetime

from django.db.models import Count, F
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.response import Response

from account.models import Writer
from blog.models import Article
from blog.serializers.article import ArticleSerializer


class ArticleFilter(FilterSet):
    class Meta:
        model = Article
        fields = ["status", ]


class ArticleList(ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = (
        ArticleFilter
    )


class ArticleStats(GenericAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        result = Writer.objects.all().values("username").annotate(total=Count("written_by"))
        # result = Article.objects.filter(created_at__gt=datetime.now()-timedelta(days=30)).values("written_by__username")
            # .values("written_by").annotate(total=Count("written_by"))
        # .annotate(created_at__gt=F("created_at")+timedelta(days=30))
        return Response(data=result, status=200)


class ArticleDetail(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    # permission_classes = [IsAuthenticated]
