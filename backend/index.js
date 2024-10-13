import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import binRoutes from './routes/binRoutes.js';

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON

const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Use bin routes
app.use('/api', binRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Waste Management System API');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
