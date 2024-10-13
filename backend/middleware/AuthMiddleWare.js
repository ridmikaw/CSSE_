// middleware/AuthMiddleWare.js
import jwt from 'jsonwebtoken'; // Import jwt
import User from '../models/User.js'; // Import your User model

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = await User.findById(decoded.id); // Fetch the user by decoded ID
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware; // Export the middleware as default
