const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  size: { type: String, required: true },
  material: { type: String, required: true }, // Thêm trường material vào đây
  additionalAttributes: {
    // Có thể thêm các thuộc tính tùy chọn khác nếu cần
  }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  description: { type: String, maxlength: 1000 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: ['Laptop', 'Phone', 'Tablet', 'Console', 'Accessory'] },
  variants: { type: [variantSchema], required: true },
  images: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every((url) => /^(https?:\/\/.+|\/uploads\/.+)/.test(url)); // Chấp nhận cả URL cục bộ và URL https
      },
      message: 'Invalid URL format in images',
    },
  },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);