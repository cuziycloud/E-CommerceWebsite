const express = require('express');
const Product = require('../models/Product');  // Đảm bảo đường dẫn đúng tới file Product.js
const router = express.Router();

// Endpoint để lấy tất cả sản phẩm
router.get('/showProducts', async (req, res) => {
  try {
    // Lấy danh sách sản phẩm từ MongoDB
    const products = await Product.find();

    // Kiểm tra nếu không có sản phẩm nào
    if (!products) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Trả về danh sách sản phẩm
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;