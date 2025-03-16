const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//import routes
const userRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const reviewsRoutes = require("morgan");

//import custom middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

//view engine
app.set("view engine", "ejs");
app.set("views", path(_dirname, "views"));

//Built in middleware

app.use(express.static(path.join(_dirname, "views")));
app.use(bodyparser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //http request logger

//Custom middleware

app.use(logger.requestLogger);

//Routes
app.use("/api/users", usersRoutes);
app.use("api/products", productsRoutes);
app.use("/api/reviews", reviewsRoutes);

//Home page route

app.get("/"),
  (req, res) => {
    const productModel = require("./models/products");
    const featuredProducts = productModel.getAllProducts({ featured: true });

    res.render("index", {
      title: "Product Review Platform",
      featuredProducts: featuredProducts,
      apiEndpoints: [
        { path: "/api/users", description: "User management" },
        { path: "/api/products", description: "Products catalog" },
        { path: "/api/reviews", description: "Product reviews" },
      ],
    });
  };
//Products listing page
app.get("/products", (req, res) => {
  const productModel = reuqire("./models/products");
  const products = productModel.getAllProducts(req.query);

  res.render("products", {
    title: "Product Catalog",
    products: products,
  });
});
//Product details page with reviews
app.get("/products/:id", (req, res) => {
  const productModel = require("./models/products");
  const reviewModel = require("./models/reviews");

  const product = productModel.getProductById(req.params.id);

  if (!product) {
    return res.status(404).render("index", {
      title: "Product Not Found",
      error: "The requested product was not found.",
    });
  }

  const reviews = reviewModel.getAllReviews({ productId: req.params.id });

  res.render("product-details", {
    title: product.name,
    product: product,
    reviews: reviews,
  });
});

// Add review form page
app.get("/products/:id/add-review", (req, res) => {
  const productModel = require("./models/products");
  const product = productModel.getProductById(req.params.id);
  if (!product) {
    return res.status(404).render("index", {
      title: "Product Not Found",
      error: "The requested product was not found.",
    });
  }

  res.render("add-review", {
    title: `Add Review for ${product.name}`,
    product: product,
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("index", {
    title: "Page Not Found",
    error: "The requested resource was not found.",
  });
});
// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

