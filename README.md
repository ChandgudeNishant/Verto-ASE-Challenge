# 📦 Inventory Management System API

A backend REST API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** to manage warehouse inventory.  
The API supports full CRUD operations for products, stock management, and integrates **Swagger UI** for documentation.  

---

## 🚀 Features
- **Product Management**
  - Create, Read, Update, Delete products.
- **Inventory Logic**
  - Stock cannot go below zero.
  - Increase/Decrease stock endpoints with validation.
- **Low Stock Alerts**
  - Define `low_stock_threshold` for products.
  - Fetch all products below the threshold.
- **Swagger Documentation**
  - Interactive API docs at `/api-docs`.
- **MongoDB Integration**
  - Connects via MongoDB Compass or MongoDB Atlas.
- **Error Handling & Logging**
  - Proper status codes and log messages.

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- Swagger UI
- dotenv (for environment variables)

---

## 📂 Project Structure
```
inventory-api/
├── config/
│   └── db.js             # MongoDB connection
├── controllers/
│   └── product.controller.js
├── models/
│   └── product.model.js
├── routes/
│   └── product.routes.js
├── services/
│   └── product.service.js
├── swagger.js            # Swagger config
├── index.js              # App entry point
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/inventory-api.git
cd inventory-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
NODE_ENV=development
```

> If using MongoDB Atlas, replace `MONGO_URI` with your Atlas URI.

### 4. Start the Server
```bash
npm start
```

Server will run at:
```
http://localhost:3000
```

Swagger Docs:
```
http://localhost:3000/api-docs
```

---

## 📌 API Endpoints

### Products
- `POST /api/products` → Create a product
- `GET /api/products` → Get all products
- `GET /api/products/:id` → Get a single product
- `PUT /api/products/:id` → Update a product
- `DELETE /api/products/:id` → Delete a product

### Inventory
- `POST /api/products/:id/addStock` → Increase stock
- `POST /api/products/:id/reduceStock` → Decrease stock (fails if insufficient)

### Low Stock
- `GET /api/products/alerts/low-stock` → Get all products below their `low_stock_threshold`

---

## 📖 Example Product JSON
```json
{
  "name": "Laptop",
  "description": "Dell Inspiron 15",
  "stock_quantity": 10,
  "low_stock_threshold": 2
}
```

---

## 🧪 Testing the API
You can test using:
- **Postman** – Import endpoints and test CRUD operations.
- **Swagger UI** – Go to [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

---

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is licensed under the MIT License.
