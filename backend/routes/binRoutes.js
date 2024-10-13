import express from 'express';
import { addBin, verifyBin, getBin } from '../controllers/binController.js';

const router = express.Router();

// POST: Add a new bin (Owner)
router.post('/bins', addBin);

// POST: Verify bin and generate QR code (Collector)
router.post('/bins/:binId/verify', verifyBin);

// GET: Get bin details by ID
router.get('/bins/:binId', getBin);

export default router;
