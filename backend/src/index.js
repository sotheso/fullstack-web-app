const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Davvvat API',
    endpoints: {
      brands: '/api/brands',
      events: '/api/events',
      banners: '/api/banners',
      stories: '/api/stories',
      sms: '/api/sms',
      auth: '/api/auth'
    }
  });
});
app.use('/api/brands', require('./routes/brands'));
app.use('/api/events', require('./routes/events'));
app.use('/api/banners', require('./routes/banners'));
app.use('/api/sms', require('./routes/sms'));
app.use('/api/stories', require('./routes/stories'));
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to database (non-blocking, will retry in production if fails)
connectDB().catch(error => {
  console.error('Initial database connection failed:', error.message);
  console.log('Server is running without database connection. Will retry in production mode.');
});