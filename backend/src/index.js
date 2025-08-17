const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
// Connect to MySQL Database
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://frontend:3000',
    'http://localhost:3000',
    'https://davvvat.ir',
    process.env.ALLOWED_ORIGIN || ''
  ].filter(Boolean)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// API routes
app.use('/api/brands', require('./routes/brands'));
app.use('/api/events', require('./routes/events'));
app.use('/api/banners', require('./routes/banners'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});