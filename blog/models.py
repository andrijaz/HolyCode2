from django.db import models

from account.models import Writer


class Article(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, default="Default title")
    content = models.CharField(max_length=1000)
    status = models.CharField(max_length=50, choices=[("Approved", "Approved"), ("Pending", "Pending"), ("Rejected", "Rejected")],
                              default="Pending")
    written_by = models.ForeignKey(Writer, on_delete=models.CASCADE, to_field="username", related_name="written_by")
    edited_by = models.ForeignKey(Writer, on_delete=models.CASCADE, to_field="username", related_name="edited_by",
                                  blank=True, null=True)
