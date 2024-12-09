const express = require('express');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/emailService'); 
const authenticateJWT = require('../middleware/authenticateJWT'); 

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/register', async (req, res) => {
  const { name, email, password, role = 'customer' } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng ký' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const trimmedEmail = email.trim().toLowerCase();

  try {
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Tài khoản của bạn đã bị cấm' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, isActive: user.isActive },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      user: { name: user.name, email: user.email, role: user.role, isActive: user.isActive }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập' });
  }
});


router.get('/me', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/role', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (user) {

      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {

      user = new User({ name, email, googleId, password: '' });
      await user.save();
    }


    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Login successful', token: jwtToken, user });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/update-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();


    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while processing the request' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found in system' });
    }


    const token = crypto.randomBytes(20).toString('hex');


    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();


    const resetUrl = `http://localhost:3000/reset-password/${token}`;


    await sendPasswordResetEmail(user.email, resetUrl);

    res.status(200).json({ message: 'Password reset link has been sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while processing the request' });
  }
});

module.exports = router;
