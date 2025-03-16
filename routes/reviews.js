const express = require('express');
const router = express.Router();
const reviewModel = require('../models/reviews');
const productModel = require('../models/products');
const userModel = require('../models/users');
const { validateReview } = require('../middleware/validator');

// GET all reviews with filtering
router.get('/', (req, res) => {
  const reviews = reviewModel.getAllReviews(req.query);
  res.json(reviews);
});