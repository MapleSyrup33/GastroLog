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

# 🧪 Testing Endpoints

This project uses a REST architecture with **JSON Web Tokens (JWT)** for authentication. To test the workflows using an API client (like Postman, Insomnia, or Thunder Client), follow the sequential lifecycle below.

### 🗺️ API Base URL
```text
[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
```
### 🔒1. Authentication Lifecycle
#### A. Register a New Account

- **Endpoint**: POST /auth/user/register/
- **Headers**: Content-Type: application/json
- **Payload(JSON)**:
```
{
    "email": "chef.dave@gastrolog.com",
    "username": "chef_dave",
    "password": "SuperSecurePassword123",
    "role": "manager"
}
```
#### B. Generate Access and refresh JWT tokens

- **Endpoint**: POST /auth/token/
- **Headers**: Content-Type: application/json
- **Payload(JSON)**:
```
{
    "email": "chef.dave@gastrolog.com",
    "password": "SuperSecurePassword123"
}
```
- **Expected Response**: Copy the long access token string from the JSON response. You will need it to authorize your next request

### 🍳2. Inventory System Lifecycle
 - **⚠️Important**: All Inventory endpoints require authorization. In your API client. go to the Auth tab, choose Bearer Token, and paste your copied access token.

    #### A.Add a Product to Stock
    - **Endpoint**: POST /inventory/products/
    - **Headers**: Authorization: Bearer < your_access_token >
    - **Payload(JSON)**:
```
{
    "name": "AAA Alberta Beef Ribeye",
    "sku": "PRO-RIB-001",
    "category": "Proteins",
    "price": "18.50",
    "quantity": "50.00",
    "unit": "Lbs",
    "min_stock": "10.00",
    "storage_location": "Walk-In Cooler",
    "supplier": "Sysco"
}
```
#### B. List All Tracked Products
   - **Endpoint**: GET /inventory/products/
   - **Headers**: Authorization: Bearer < your_access_token >
   - **Note**: Note the id *of the Ribeye product returned in the response array (e.g., 1)*

#### C. Update Product Stock (Manual Count Adjust)
- **Endpoint**: PATCH /inventory/products/< id >/ (e.g., /inventory/products/1/)
- **Headers**: Authorization: Bearer < your_access_token >
- **Payload(JSON)**:
```
{
    "quantity": "48.50"
}
```

### 🗑️3. Waste Log Intelligence & Stock Math

#### A.Record a kitchen Incident (Automated Deduction)
When food waste is logged, GastroLog instantly deducts the quantity_wasted balance from the corresponding product's stock count.

    - **Endpoint**: POST /inventory/waste/
    - **Headers**: Authorization: Bearer < your_access_token >
    - **Payload(JSON)**:
```
{
    "product": 1,
    "quantity_wasted": "3.50",
    "reason": "Prep Error",
    "notes": "New apprentice cook over-trimmed the subprimal chain link."
}
```
- ***Verification***: if you re-fetch GET /inventory/products/1/ ,  you will see the physical quantity has dropped by exactly 3.50 automatically.

#### B. Delete a Waste Entry (Error Correction / Reversal)

if a log was submitted by mistake, deleting it reverses the calculation logic and safely adds the stock metrics back to the ingredient shelf.

- **Endpoint**: DELETE /inventory/wate/< waste_id >/
- **Headers**: Authorization: Bearer < your_access_token >
---
