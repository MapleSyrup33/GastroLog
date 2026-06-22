# 🍳 GastroLog Inventory System

> **Simple food waste intelligence & inventory built specifically for busy restaurant operators.**

GastroLog is a modern, responsive web application designed to help restaurant managers, chefs, and operators keep track of their stock levels, monitor wholesale food cost inflation, and reduce kitchen waste. With an elegant dark/light theme toggle and a glassmorphic user interface, GastroLog makes stock-taking frictionless and visually engaging.

---

## ✨ Features

- **📊 Interactive Dashboard**: A live, glassmorphic overview of key metrics (Unique Products, Total Units, Net Inventory Value, and Low/Out-of-Stock warnings).
- **🔍 Stock Valuation & Catalog Table**: A searchable and filterable database view of all catalog items.
- **🏷️ Smart Categorization**: Organizes inventory items into custom food service categories: *Proteins, Dairy, Produce, Disposables, Beverages, and Dry Goods*.
- **⚡ Real-time Search & Filter**: Dynamically query catalog items by name, SKU, category, or stock level health status.
- **➕ Client-side simulated CRUD operations**: Test item creation, editing, and deletion workflow smoothly inside the browser using client-side memory.
- **🌗 Dark & Light Themes**: Smooth transitions between visual modes, persisted via `localStorage`.
- **🗃️ Ready-to-go Backend Models**: Includes a Django backend layout with a prepared SQLite database model `Product` to track product units, SKU, costs, stock levels, suppliers, and storage locations.

---

## 🛠️ Installation & Setup

Follow these instructions to configure and run GastroLog on your Windows machine:

### 1. Prerequisites
Ensure you have **Python 3.10+** installed on your system. You can check your version in PowerShell:
```powershell
python --version
```

### 2. Activate the Virtual Environment
# Activate the virtual environment
```
.\.venv\Scripts\activate
```
*(Note: If you need to create the environment, run `python -m venv .venv` and re-activate).*

### 3. Install Dependencies
Install all required packages (including Django 6.x, utility libraries, etc.) using `pip`:
```powershell
pip install -r requirements.txt
```

### 4. Create and Apply Database Migrations
Make sure to generate and apply migrations for the `Product` model to initialize the SQLite database table:
```powershell
# Generate migration files for the inventory system application
python manage.py makemigrations

# Apply migrations to update the SQLite database
python manage.py migrate
```

### 5. Create a Superuser Account (Optional)
If you want to view or manage raw database entries in Django's built-in administration panel:
```powershell
python manage.py createsuperuser
```
Follow the prompts to set a username, email, and password.

### 6. Run the Development Server
Launch the server locally:
```powershell
python manage.py runserver
```
Once running, open your web browser and navigate to:
- **Landing Page**: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Django Admin Panel**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---
