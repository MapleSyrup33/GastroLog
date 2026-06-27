# 🍳 GastroLog Inventory System

> **A full-stack food waste intelligence & inventory application built with Django and React, designed specifically for busy restaurant operators.**

GastroLog is a modern, responsive full-stack web application designed to help restaurant managers, chefs, and operators keep track of their stock levels, monitor wholesale food cost inflation, and reduce kitchen waste. It combines a powerful Django REST Framework backend with a dynamic React frontend powered by Vite, featuring an elegant dark/light theme toggle and a glassmorphic user interface to make stock-taking frictionless and visually engaging.

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
Ensure you have the following installed on your system:
- **Python 3.10+** (for the Django backend)
- **Node.js 18+ & npm** (for the React frontend)

Verify your installations in PowerShell:
```powershell
python --version
node --version
npm --version
```

### 2. Backend Setup (Django)
Navigate to the `backend` directory to set up the backend server:
```powershell
cd backend
```

#### A. Activate the Virtual Environment
Activate the virtual environment:
```powershell
.\venv\Scripts\activate
```
*(Note: If you need to create the environment first, run `python -m venv venv` and re-activate).*

#### B. Install Backend Dependencies
Install the required Python packages using `pip`:
```powershell
pip install -r requirements.txt
```

#### C. Create and Apply Database Migrations
Generate and apply migrations for the database models to initialize the SQLite database:
```powershell
# Generate migration files for the applications
python manage.py makemigrations

# Apply migrations to update the database schema
python manage.py migrate
```

#### D. Create a Superuser Account (Optional)
If you want to view or manage raw database entries in Django's built-in administration panel:
```powershell
python manage.py createsuperuser
```
Follow the prompts to set a username, email, and password.

#### E. Run the Backend Server
Launch the Django development server locally:
```powershell
python manage.py runserver
```
The backend API and admin panel will be accessible at:
- **Django Admin Panel**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **API Base URL**: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)

---

### 3. Frontend Setup (React + Vite)
Open a new terminal window/tab and navigate to the `frontend` directory:
```powershell
cd frontend
```

#### A. Install Frontend Dependencies
Install all the required Node packages using `npm`:
```powershell
npm install
```

#### B. Run the Frontend Development Server
Start the frontend development server:
```powershell
npm run dev
```
Once the Vite development server is running, you can access the frontend in your web browser at:
- **Frontend URL**: [http://localhost:5173/](http://localhost:5173/)

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

- **Endpoint**: DELETE /inventory/waste/< waste_id >/
- **Headers**: Authorization: Bearer < your_access_token >
---
