from django.urls import path
from .views import save_usage, dashboard, usage_data

urlpatterns = [
    path('save/', save_usage),
    path('dashboard/', dashboard),
    path('usage/', usage_data),
]