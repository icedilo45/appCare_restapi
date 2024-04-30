from rest_framework.response import Response
from rest_framework.decorators import api_view
# from django.forms.models import model_to_dict
from products.serializers import ProductSerializer
# from products.models import Product

# Create your views here.

@api_view(['POST'])
def api_home(request, *args, **kwargs):
    '''Django Rest Framework API View'''
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # instance = serializer.save()
        print(serializer.data)
        return Response(serializer.data)
    return Response({'Invalid': 'Data not good'}, status=400)