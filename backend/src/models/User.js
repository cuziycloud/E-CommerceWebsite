const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  fullAddress: {
    type: String,
    required: true
  }
});
>>>>>>> a8a81ce (Final code)

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
<<<<<<< HEAD
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  // Đảm bảo email hợp lệ
  },
  password: {
    type: String,
    required: true
=======
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    type: String
  },
  googleId: {
    type: String
>>>>>>> a8a81ce (Final code)
  },
  role: {
    type: String,
    required: true,
<<<<<<< HEAD
    enum: ['admin', 'customer']
=======
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  addresses: {
    type: [addressSchema],
    default: []
  },
  phoneNumber: {
    type: String,
    default: ''
>>>>>>> a8a81ce (Final code)
  },
  createdAt: {
    type: Date,
    default: Date.now
<<<<<<< HEAD
  }
});

=======
  },
  orderHistory: [{
    orderId: mongoose.Schema.Types.ObjectId,
    orderDate: Date,
    orderTotal: Number
  }],
  loyaltyPoints: {
    type: Number,
    default: 0
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

>>>>>>> a8a81ce (Final code)
const User = mongoose.model('User', userSchema);

module.exports = User;
