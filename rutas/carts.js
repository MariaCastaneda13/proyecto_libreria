const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

// Create a new cart
router.post('/', cartsController.createCart);

// Get products in a cart by ID
router.get('/:cid', cartsController.getCartById);

// Add a product to a cart
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
