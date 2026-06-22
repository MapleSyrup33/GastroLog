from django.db import models
from django.conf import settings

# Create your models here.
class Product(models.Model):
    CATEGORY_CHOICES = [
    ('Proteins', 'Proteins'),
    ('Dairy', 'Dairy'),
    ('Produce', 'Produce'),
    ('Beverages', 'Beverages'),
    ('Dry Goods', 'Dry Goods'),
    ('Disposables', 'Disposables'),
    ]

    LOCATION_CHOICES = [
        ('Walk-In Cooler', 'Walk-In Cooler'),
        ('Walk-In Freezer', 'Walk-In Freezer'),
        ('Dry Pantry', 'Dry Pantry'),
        ('Bar Shelf', 'Bar Shelf'),
        ('Line Station', 'Line Station'),
        ('Bar Walk-in Cooler','Bar Walk-in Cooler'),

    ]

    UNIT_CHOICES = [
        ('Cases', 'Cases'),
        ('Lbs', 'Lbs'),
        ('Gallons', 'Gallons'),
        ('Bottles', 'Bottles'),
        ('Packs', 'Packs'),
        ('Ounces', 'Ounces'),
        ('Units', 'Units'),
    ]

    name = models.CharField(max_length=255, help_text="Product name, e.g., USDA Choice Ribeye")
    sku = models.CharField(max_length=100, unique=True, help_text="Stock Keeping Unit number")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, help_text="Food department or supply class")

    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Unit purchase cost from supplier")
    quantity = models.DecimalField(max_digits=8, decimal_places=2, default=0.0, help_text="Current stock quantity (allows fractional counting)")
    unit = models.CharField(max_length=30, choices=UNIT_CHOICES, default='Cases', help_text="Unit of measurement (e.g., Lbs, Gallons)")
    min_stock = models.DecimalField(max_digits=8, decimal_places=2, default=5.0, help_text="Low stock alert trigger amount")
    storage_location = models.CharField(max_length=50, choices=LOCATION_CHOICES, default='Dry Pantry', help_text="Where the item is physically stored")
    supplier = models.CharField(max_length=255, blank=True, null=True, help_text="Vendor/supplier name (e.g., Sysco, US Foods)")
    
    last_modified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="The user account that last managed or adjusted this stock item"
    )
    last_updated = models.DateTimeField(auto_now=True, help_text="Automatically track last modification")

    def __str__(self):
        return f"{self.name} ({self.sku}) - {self.quantity} {self.unit}"
    
class WasteLog(models.Model):

    REASON_CHOICES = [
        ('Spoilage', 'Spoilage / Expired'),
        ('Prep Error', 'Ktichen Prep Error'),
        ('Dropped', 'Dropped / Damaged '),
        ('Customer Return', 'Customer Return / Complaint'),
        ('Over-Portioning', 'Over-Portioning / Line Waste'),
    ]

    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='waste_logs', help_text="The inventory item that was wasted")
    quantity_wasted = models.DecimalField(max_digits=3, decimal_places=3, help_text="Quantity wasted, in the product's default unit of measurement")
    reason = models.CharField(max_length=50, choices=REASON_CHOICES, help_text= "Why was this product thrown away?")
    notes = models.TextField(blank=True, null=True ,help_text="Optional context (e.g. 'not prepped to spec', 'spoiled / burnt)")
    logged_by = models.ForeignKey('authentication.CustomUser', on_delete=models.SET_NULL, null=True, help_text="Staff member who recorded the waste")
    created_at =  models.DateTimeField(auto_now_add=True, help_text= "Timestamp of exactly when waste occurred")

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        product_name = self.product.name if self.product else "Deleted Product"
        return f"WASTE: {self.quantity_wasted}x {product_name} due to {self.reason}"
    
    @property
    def financial_loss(self):
        """
        Dynamically calculates how much money walked out the back door.
        Calculates: quantity_wasted * product unit price
        """
        if self.product:
            return self.quantity_wasted * self.product.price
        return 0.00