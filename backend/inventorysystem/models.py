from django.db import models

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
    last_updated = models.DateTimeField(auto_now=True, help_text="Automatically track last modification")

    def __str__(self):
        return f"{self.name} ({self.sku}) - {self.quantity} {self.unit}"