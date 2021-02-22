from django.test import TransactionTestCase
from django.urls import reverse
from rest_framework.test import APIClient

from account.models import Writer
from account.tests.test_data import writer_data, editor_data


class WriterTests(TransactionTestCase):
    login = reverse("token_obtain_pair")
    writer_list = reverse("writer-list")
    writer_detail = reverse("writer-detail", args=[1])

    client_class = APIClient
    reset_sequences = True

    def setUp(self) -> None:
        self.default_user = Writer.objects.create_user(**writer_data)
        self.log_me_in()

    def log_me_in(self, username="Test", password="TestPass"):
        login_data = {"password": password, "username": username}
        res = self.client.post(data=login_data, path=self.login)
        first_user_token = res.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + first_user_token)

    def test_writer_list(self):
        resp = self.client.get(self.writer_list)
        self.assertEqual(len(resp.data.get("results")), 1)
        self.assertEqual(resp.status_code, 200)

    def test_writer_detail(self):
        resp = self.client.get(self.writer_detail)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data.get("is_editor"), False)

    def test_create_writer(self):

        resp =  self.client.post(self.writer_list, data=editor_data)
        self.assertEqual(resp.status_code, 201)
        resp = self.client.get(self.writer_list)
        self.assertEqual(len(resp.data.get("results")), 2)