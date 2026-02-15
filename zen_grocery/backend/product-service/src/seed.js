// This file inserts sample products into database

const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Delete old data (optional)
    await Product.deleteMany();

    // Insert new products
    await Product.insertMany([
      {
        name: "Apple",
        price: 120,
        category: "Fruits",
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Milk",
        price: 60,
        category: "Dairy",
        imageUrl: "https://via.placeholder.com/150"
      },
      {
        name: "Carrot",
        price: 40,
        category: "Vegetables",
        imageUrl: "https://via.placeholder.com/150"
      }
    ]);

    console.log("Products seeded successfully!");
    process.exit();
  })
  .catch(err => console.error(err));
