from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from .models import Usage
from django.db.models import Sum
from django.shortcuts import render

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def save_usage(request):
    print("🔥 Incoming data:", request.data)   # ADD THIS

    domain = request.data.get('domain')
    time_spent = request.data.get('time_spent')

    if not domain or not time_spent:
        return Response({"error": "Invalid data"}, status=400)

    Usage.objects.create(
        domain=domain,
        time_spent=time_spent
    )

    return Response({"status": "success"})

@api_view(['GET'])
def usage_data(request):
    data = (
        Usage.objects
        .values('domain')
        .annotate(total_time=Sum('time_spent'))
        .order_by('-total_time')
    )
    return Response(list(data))

def dashboard(request):
    data = (
        Usage.objects
        .values('domain')
        .annotate(total_time=Sum('time_spent'))
        .order_by('-total_time')
    )
    print("Dashboard Data:", list(data))

    return render(request, 'tracker/dashboard.html', {'data': data})

