require('dotenv').config(); // Đảm bảo dotenv được gọi để sử dụng các biến môi trường

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth'); // Đảm bảo import routes
const getProductsRoutes = require('./src/routes/getProducts')

const app = express();
app.use(express.json())

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Sử dụng các route
app.use('/api/auth', authRoutes);
app.use('/api/getProducts', getProductsRoutes);


// Chạy server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});