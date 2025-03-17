
// middleware/logger.js
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    
    // Add timestamp to request object for use in other middleware
    req.timestamp = timestamp;
    next();
  };
  
  module.exports = { requestLogger };
  