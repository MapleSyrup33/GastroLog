from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Product, WasteLog
from .serializers import ProductSerializer, WasteLogSerializer

# Create your views here.
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by('name')
    serializer = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(last_modified_by=self.request.user)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(last_modified_by=self.request.user)

class WasteLogListCreateView(generics.ListCreateAPIView):

    queryset = WasteLog.objects.all()
    serializer_class = WasteLogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
       
        waste_entry = serializer.save(logged_by=self.request.user)
        
        product = waste_entry.product
        if product:
            product.quantity -= waste_entry.quantity_wasted
            product.save(update_fields=['quantity', 'last_updated'])


class WasteLogDetailView(generics.RetrieveDestroyAPIView):

    queryset = WasteLog.objects.all()
    serializer_class = WasteLogSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):

        product = instance.product
        if product:
            product.quantity += instance.quantity_wasted
            product.save(update_fields=['quantity', 'last_updated'])
        instance.delete()