import express from 'express';
import { createWasteRequest } from '../controllers/WasteRequestController.js';
const router = express.Router();

router.post('/postwasterequest', createWasteRequest);

export default router;