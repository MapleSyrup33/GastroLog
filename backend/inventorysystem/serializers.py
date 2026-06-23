from rest_frameworks import serializers
from .models import Product, WasteLog
from django.contrib.auth import get_user_model

User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
    last_modified_by_username = serializers.CharField(source='last_modified_by.username', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'sku', 'category', 'price', 'quantity', 
            'unit', 'min_stock', 'storage_location', 'supplier', 
            'last_modified_by', 'last_modified_by_username', 'last_updated'
        ]
        read_only_fields = ['last_modified_by', 'last_updated']

class WasteLogSerializer(serializers.ModelSerializer):
    finacial_loss = serializers.ReadOnlyField()
    logged_by_username = serializers.CharField(source='logged_by_username', read_only = True)
    product_details = ProductSerializer(source='product', read_only=True)
    class Meta:
        model = WasteLog
        fields = [
            'id', 'product', 'product_details', 'quantity_wasted', 
            'reason', 'notes', 'logged_by', 'logged_by_username', 
            'financial_loss', 'created_at'
        ]
        read_only_fields= ['logged_by', 'created_at', 'financial_loss']

    def validate(self, data):
        product= data.get('product')
        quantity_wasted = data.get('quantity_wasted')
    
        if product and quantity_wasted > product.quantity:
            raise serializers.ValidationError({
                "quantity_wasted": f"Cannot log waste ({quantity_wasted}) greater than current physical stock balance ({product.quantity})."
            })
        return data