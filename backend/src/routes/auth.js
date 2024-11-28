// backend/src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Lưu người dùng vào DB
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng ký' });
  }
});

module.exports = router;
