const validateUser = (req, res, next) => {
  const { username, email } = req.body;

  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  next();
};
const validateProduct = (req, res, next) => {
  const { name, description, price } = req.body;

  if (!name || name.trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Product name must be at least 3 characters long" });
  }

  if (!description || description.trim().length < 10) {
    return res
      .status(400)
      .json({ error: "Description must be at least 10 characters long" });
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }

  next();
};

const validateReview = (req, res, next) => {
  const { userId, productId, rating, comment } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  if (
    !rating ||
    isNaN(parseInt(rating)) ||
    parseInt(rating) < 1 ||
    parseInt(rating) > 5
  ) {
    return res
      .status(400)
      .json({ error: "Rating must be a number between 1 and 5" });
  }

  if (!comment || comment.trim().length < 5) {
    return res
      .status(400)
      .json({ error: "Review comment must be at least 5 characters long" });
  }

  next();
};

module.exports = { validateUser, validateProduct, validateReview };
