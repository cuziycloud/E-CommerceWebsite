const User = require('../models/User');


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Không thể lấy danh sách người dùng', error: error.message });
  }
};
