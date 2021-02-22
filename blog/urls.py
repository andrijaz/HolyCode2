from django.urls import path

from blog.views import ArticleDetail, ArticleList, ArticleStats

urlpatterns = [
    path("article", ArticleList.as_view(), name="article-list"),
    path("article/<int:pk>", ArticleDetail.as_view(), name="article-detail"),
    path("article/stats", ArticleStats.as_view(), name="article-stats")

]
