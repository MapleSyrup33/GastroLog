from django.contrib import admin
from .models import Product, WasteLog

# Register your models here.


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # Columns visible at a glance in the main list view
    list_display = ('name', 'sku', 'category', 'price', 'quantity', 'unit', 'storage_location', 'last_updated')
    
    # Left sidebar filters for rapid sorting
    list_filter = ('category', 'storage_location', 'supplier')
    
    # Search bar targets core strings
    search_fields = ('name', 'sku', 'supplier')
    
    # Makes clicking "last_modified_by" jump straight to that user's admin profile
    raw_id_fields = ('last_modified_by',)


@admin.register(WasteLog)
class WasteLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'quantity_wasted', 'reason', 'get_financial_loss', 'logged_by', 'created_at')
    list_filter = ('reason', 'created_at', 'product__category')
    search_fields = ('product__name', 'notes')
    raw_id_fields = ('logged_by', 'product')

    # Custom read-only display method to safely output your model property inside the table columns
    @admin.display(ordering='product__price', description='Total Financial Loss ($)')
    def get_financial_loss(self, obj):
        return f"${obj.financial_loss:,.2f}"