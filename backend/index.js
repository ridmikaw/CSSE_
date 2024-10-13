import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import binRoutes from './routes/binRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import { authRoutes } from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON

const port = process.env.PORT || 4000;

app.use(cors());
// Connect to MongoDB
connectDB();

// Use routes
app.use('/api', authRoutes);
app.use('/api', binRoutes); // Bin routes
app.use('/api', userRoutes); // User routes

// Default route
app.get('/', (req, res) => {
  res.send('Waste Management System API');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
