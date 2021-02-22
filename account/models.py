from django.contrib.auth.models import AbstractUser
from django.db import models

class Writer(AbstractUser):
    is_editor = models.BooleanField(default=False)

# Writer.objects.all().values("username").annotate(total=Count("written_by"))\
#     .annotate(old=Count("written_by")).filter(article__creted_at__gt=F("created_at") + timedelta(days=30))