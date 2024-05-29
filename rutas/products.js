const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// List all products
router.get('/', productsController.getAllProducts);

// Get a product by ID
router.get('/:pid', productsController.getProductById);

// Add a new product
router.post('/', productsController.addProduct);

// Update a product by ID
router.put('/:pid', productsController.updateProduct);

// Delete a product by ID
router.delete('/:pid', productsController.deleteProduct);

module.exports = router;
