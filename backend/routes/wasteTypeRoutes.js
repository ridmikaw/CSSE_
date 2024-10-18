import express from 'express';
import { createWasteType } from '../controllers/WasteTypeController.js';
const router = express.Router();

router.post('/add-waste-type', createWasteType);


export default router;