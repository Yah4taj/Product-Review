const express = require('express');
const router = express.Router();
const productModel = require('../models/products');
const { validateProduct } = require('../middleware/validator');

// GET all products with filtering
router.get('/', (req, res) => {
  const products = productModel.getAllProducts(req.query);
  res.json(products);
});