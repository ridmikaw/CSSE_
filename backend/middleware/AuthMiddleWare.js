import jwt from 'jsonwebtoken'; // Import jwt
import User from '../models/User.js'; // Import your User model

const authMiddleware = async (req, res, next) => {
  console.log('Auth middleware triggered'); 
  const token = req.header('Authorization').replace('Bearer ', '')
  
  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded ID:', decoded.id); // Log the decoded ID

    // Fetch user from the database
    req.user = await User.findById(decoded.userId);
    console.log('Fetched User:', req.user); // Log the fetched user

    
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    next(); 
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware; // Export the middleware as default
