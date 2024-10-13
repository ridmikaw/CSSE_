import express from 'express';
import {
  addBin,
  verifyBin,
  getUserBins,
} from '../controllers/binController.js';

const router = express.Router();

// Protect the routes with the authentication middleware
router.post('/bins', addBin);
router.get('/bins/:userId', getUserBins);
router.put('/bins/verify/:binId', verifyBin);

export default router;
