from django.db import models

class Usage(models.Model):
  domain = models.CharField(max_length=255)
  time_spent = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.domain} - {self.time_spent}"
  
  