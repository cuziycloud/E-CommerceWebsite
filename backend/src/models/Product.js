const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Laptop', 'Phone', 'Tablet', 'Console', 'Accessory']
  },
  variants: [
    {
      color: {
        type: String,
        required: true
      },
      stock: {
        type: Number,
        required: true,
        min: 0
      },
      size: {
        type: String,
        required: true
      },
      material: {
        type: String,
        required: true
      }
    }
  ],
  images: [
    {
      type: String,
      match: /^(https?:\/\/.+|\/uploads\/.+)$/  // Kiểm tra URL hợp lệ
    }
  ],
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo model từ schema
const Product = mongoose.model('products', productSchema);

module.exports = Product;
