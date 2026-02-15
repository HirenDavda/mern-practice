const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
// app.use(express.json());

console.log("Starting API Gateway...");

// LOGGING - middleware
// This prints every request coming to gateway
app.use((req, res, next) => {
    console.log(`📌 ${req.method} request to ${req.originalUrl}`);
    next();
});

// RATE LIMIT - Allow max 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests
    message: "Too many requests. Please try later."
});


// AUTH PLACEHOLDER - Middleware to check authentication
// This will run before request goes to services
const authMiddleware = (req, res, next) => {
  // In future we will check JWT token here
  console.log("🔐 Checking authentication...");
  
  // For now, allow all requests
  next(); // move to next step
};
app.use(authMiddleware);

app.use((req, res, next) => {
  console.log("🔐 Auth check...");
  next();
});


// Debug log
app.use((req, res, next) => {
  console.log("Gateway received:", req.method, req.url);
  next();
});


/* -----------------------------
   🔹 PROXIES (IMPORTANT: BEFORE custom routes)
------------------------------ */

// Product Service
app.use(
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathFilter: ["/api/products"],
  })
);

// Cart Service
app.use(
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathFilter: ["/api/cart"],
  })
);

app.use("api", limiter);

/* -----------------------------
   🔹 AGGREGATION ROUTE
   (Must come AFTER proxies)
------------------------------ */

//AGGREGATION ROUTE - This route combines product + cart
app.get('/api/summary', async (req, res) => {
    try {
        console.log("Trying to connect to:");
        // Call product service
        const products = await axios.get('http://localhost:5001/api/products');

        // Call cart service
        const cart = await axios.get('http://localhost:5002/api/cart');

        // Combine both responses
        res.json({
            products: products.data,
            cart: cart.data
        });
        
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ message: "Aggregation failed" });
    }
});

// Root test
app.get("/", (req, res) => {
  res.send("Gateway is alive 🚀");
});

app.listen(8000, () => {
    console.log("🚦 API Gateway running on port 8000");
});