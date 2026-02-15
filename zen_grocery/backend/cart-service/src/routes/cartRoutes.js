const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET /api/cart - All product
router.get('/', async (req, res) => {
    const items = await Cart.find();
    res.json(items);
});


// POST /api/cart - Add new item
router.post('/', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log("Cart POST received:", req.body);

        const existingItem = await Cart.findOne({ productId });
        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json(existingItem);
        }

        const newItem = new Cart({
            productId,
            quantity
        });
        await newItem.save();
        return res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});
 

// DELETE /api/cart/:id - Delete product
router.delete('/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Item removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
