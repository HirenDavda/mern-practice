# 🛒 Zen Grocery - Microservices MERN Application

A production-ready grocery shopping SPA built using:

- React + TypeScript
- Node.js + Express
- MongoDB
- Microservices Architecture
- API Gateway Pattern

---

## 🏗 Architecture

Frontend (React)
        ↓
API Gateway (Port 8000)
        ↓
Product Service (5001)
Cart Service (5002)
        ↓
MongoDB

---

## 🚀 Features

- Product listing from MongoDB
- Category filtering
- Add to Cart functionality
- Cart quantity management
- Remove from Cart
- Cart limit enforcement
- Microservices architecture
- API Gateway routing
- CORS handling
- Environment-based configuration

---

## 📦 Tech Stack

Frontend:
- React
- TypeScript
- Axios
- Bootstrap

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- http-proxy-middleware

---

## ⚙️ Installation & Setup

2) Setup Backend
Product Service
- cd backend/product-service
- npm install

Create .env file:
PORT=5001
MONGO_URI=mongodb://localhost:27017/zen_grocery

npm start/node server.js

Cart Service
- cd backend/card-service
- npm install

Create .env file:
PORT=5002
MONGO_URI=mongodb://localhost:27017/zen_grocery

npm start/node server.js

API Gateway
cd backend/api-gateway
npm install

node server.js

browser apps runs on
http://localhost:8000


3) Setup Frontend
cd frontend
npm install
npm start

browser apps runs on
http://localhost:3000


API Endpoints
Products
GET /api/products

Cart
GET /api/cart
POST /api/cart
DELETE /api/cart/:id

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/zen-grocery-microservices.git
cd zen-grocery-microservices
