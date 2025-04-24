const jwt = require('jsonwebtoken');

// This middleware checks if token exists and is valid
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with Bearer
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1]; // Get token part
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      req.user = decoded; // Attach user info to request
      next(); // Allow access
    } catch (error) {
      return res.status(401).json({ message: 'Token is invalid or expired' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

// Optional: Only allow access to admin users
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Allow access
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = { protect, adminOnly };
