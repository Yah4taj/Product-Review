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
// POST - Create a new review
router.post('/', validateReview, (req, res, next) => {
  // Validate that the product and user exist
  const product = productModel.getProductById(req.body.productId);
  const user = userModel.getUserById(req.body.userId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  try {
    const newReview = reviewModel.createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});
// PATCH - Update a review
router.patch('/:id', (req, res) => {
  const updatedReview = reviewModel.updateReview(req.params.id, req.body);
  
  if (!updatedReview) {
    return res.status(404).json({ error: 'Review not found' });
  }
  
  res.json(updatedReview);
});
 // DELETE - Remove a review
 router.delete('/:id', (req, res) => {
  const success = reviewModel.deleteReview(req.params.id);
  
  if (!success) {
    return res.status(404).json({ error: 'Review not found' });
  }
  
  res.status(204).end();
});

module.exports = router;
