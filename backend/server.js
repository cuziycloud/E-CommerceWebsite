require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/productRoutes'); // Import route product
const uploadRoutes = require('./src/routes/uploadRoutes'); // Import route upload

const app = express();

// Middleware
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

// Sử dụng các route
app.use('/api/auth', authRoutes);
app.use('/api/getProducts', productRoutes); // Sử dụng route product
app.use('/api/uploads', uploadRoutes); // Sử dụng route upload

// Đặt thư mục 'uploads' là static để phục vụ file ảnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Chạy server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});