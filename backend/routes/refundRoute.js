import express from 'express';
import { createRefund } from '../controllers/RefundController.js';
const router = express.Router();

router.post('/refund', createRefund);


export default router;