import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/booknest';

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/books', bookRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.send('Library Management System API is running...');
});

// Connect to MongoDB & Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
