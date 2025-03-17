const express = require('express');
const router = express.Router();
const productModel = require('../models/products');
const { validateProduct } = require('../middleware/validator');

// GET all products with filtering
router.get('/', (req, res) => {
  const products = productModel.getAllProducts(req.query);
  res.json(products);
});
  // GET a specific product by ID
router.get('/:id', (req, res) => {
  const product = productModel.getProductById(req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// POST - Create a new product
router.post('/', validateProduct, (req, res) => {
  const newProduct = productModel.createProduct(req.body);
  res.status(201).json(newProduct);
});
// PUT - Update a product (full update)
router.put('/:id', validateProduct, (req, res) => {
  const updatedProduct = productModel.updateProduct(req.params.id, req.body);
  
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(updatedProduct);
});

// PATCH - Update a product (partial update)
router.patch('/:id', (req, res) => {
  const updatedProduct = productModel.updateProduct(req.params.id, req.body);
  
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(updatedProduct);
});

// DELETE - Remove a product
router.delete('/:id', (req, res) => {
  const success = productModel.deleteProduct(req.params.id);
  
  if (!success) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.status(204).end();
});

module.exports = router;
