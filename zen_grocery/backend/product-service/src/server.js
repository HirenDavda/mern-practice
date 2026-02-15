const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./controllers/productscontrollers');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// const PORT = process.env.PORT || 5001;
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`🚀 Product Service running on port ${PORT}`)
});


// Steps 
// npm i express mongoose pug dotenv
// .env file create and set port
// app.js file create and create server 
// folders like, view, model, controllers, routes
// models > create user.js data object create
// routes > create file and setup routes
// controllers > create file and write logic
// views > create layout, index file for repeted view and then create spacific view file for user data view` 

