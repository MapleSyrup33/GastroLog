from django.urls import path
from .views import (
    ProductListCreateView, 
    ProductDetailView, 
    WasteLogListCreateView, 
    WasteLogDetailView
)

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('waste/', WasteLogListCreateView.as_view(), name='waste-list-create'),
    path('waste/<int:pk>/', WasteLogDetailView.as_view(), name='waste-detail'),
]