import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 4000;

const mongoURI = 'mongodb+srv://thisarajack1:thisara@cluster0.yp9ld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello, ');
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});