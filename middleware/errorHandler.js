
// middleware/errorHandler.js


const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.stack}`);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    // Check if the request is an API request or a page request
    const isApiRequest = req.originalUrl.startsWith('/api');
    
    if (isApiRequest) {
      // Return JSON error for API requests
      return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
      });
    }
  
    // Render error page for web requests
    res.status(statusCode).render('index', {
      title: 'Error',
      error: message
    });
  };
  module.exports = errorHandler;
