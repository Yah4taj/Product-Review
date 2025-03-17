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
// GET reviews for a specific product
router.get('/product/:productId', (req, res) => {
  const reviews = reviewModel.getAllReviews({ productId: req.params.productId });
  res.json(reviews);
});

// GET reviews by a specific user
router.get('/user/:userId', (req, res) => {
  const reviews = reviewModel.getAllReviews({ userId: req.params.userId });
  res.json(reviews);
});
// GET a specific review by ID
router.get('/:id', (req, res) => {
  const review = reviewModel.getReviewById(req.params.id);
  
  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }
  
  res.json(review);
});