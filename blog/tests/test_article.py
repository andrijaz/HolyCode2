from django.test import TransactionTestCase
from django.urls import reverse
from rest_framework.test import APIClient

from account.models import Writer
from account.tests.test_data import writer_data
from blog.models import Article
from blog.tests.test_data import article_one, article_two


class ArticleTests(TransactionTestCase):
    login = reverse("token_obtain_pair")
    article_list = reverse("article-list")
    article_detail = reverse("article-detail", args=[1])

    client_class = APIClient
    reset_sequences = True

    def setUp(self) -> None:
        self.default_user = Writer.objects.create_user(**writer_data)
        article_one.update({"written_by": self.default_user})
        self.default_article = Article.objects.create(**article_one)
        self.log_me_in()

    def log_me_in(self, username="Test", password="TestPass"):
        login_data = {"password": password, "username": username}
        res = self.client.post(data=login_data, path=self.login)
        first_user_token = res.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + first_user_token)

    def test_article_list(self):
        resp = self.client.get(self.article_list)
        self.assertEqual(len(resp.data.get("results")), 1)
        self.assertEqual(resp.status_code, 200)

    def test_article_detail(self):
        resp = self.client.get(self.article_detail)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data.get("content"), "Content")

    def test_create_article(self):
        article_two.update({"written_by": self.default_user})
        resp = self.client.post(self.article_list, data=article_two)
        self.assertEqual(resp.status_code, 201)
        resp = self.client.get(self.article_list)
        self.assertEqual(len(resp.data.get("results")), 2)
