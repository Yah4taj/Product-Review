# Product Review Platform     (Note* Experienced challeges with retrieving images for the three smaple products ( image URLs commented out still hindered functionality so images removed ))

A  web application for product reviews, built with Express.js and EJS templating.

## Features

- Browsable product catalog with detailed product pages
- User review system with ratings and comments
- RESTful API endpoints for users, products, and reviews


## Tech 

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating, HTML, CSS, JavaScript
- **Data**: Model-based data architecture (extensible to databases)
- **Logging**: Morgan and custom logging middleware
- **Error Handling**: Custom error handling middleware



## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/users` | User management |
| `/api/products` | Products catalog |
| `/api/reviews` | Product reviews |


## Routes

- `/` - Homepage with featured products
- `/products` - Complete product catalog
- `/products/:id` - Individual product details with reviews
- `/products/:id/add-review` - Form to add a new review


Note* Experienced challeges with retrieving images for the three smaple products ( image URLs are commented out )
