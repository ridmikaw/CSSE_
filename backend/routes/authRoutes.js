// routes/authRoutes.js
import express from 'express';
import authMiddleware from '../middleware/AuthMiddleWare.js'; // Import the middleware

const router = express.Router();

// Route to check if the token is valid and return user data
router.get('/auth/check', authMiddleware, (req, res) => {
  
  console.log('User authenticated:', req.user); // Log authenticated user details
  return res.json({ message: 'This route works!', user: req.user });
});

// Export router as a named export
export const authRoutes = router;
