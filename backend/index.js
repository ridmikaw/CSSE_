import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Initialize dotenv to load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port if available

const mongoURI = process.env.MONGO_URI; // Fetch MongoDB URI from environment variable

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  });

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Hello, welcome to our API!');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
