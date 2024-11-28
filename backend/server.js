// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');  // Import routes

const app = express();

// Cấu hình middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Sử dụng các route
app.use('/api/auth', authRoutes);

// Chạy server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
