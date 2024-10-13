import express from 'express';
import {
  addBin,
  verifyBin,
  getUserBins,
} from '../controllers/binController.js';
import protect from '../middleware/AuthMiddleWare.js';

const router = express.Router();

// Protect the routes with the authentication middleware
router.post('/bins', protect, addBin);
router.get('/bins/:userId', protect, getUserBins);
router.put('/bins/verify/:binId', protect, verifyBin);

export default router;
