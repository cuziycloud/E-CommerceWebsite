const mongoose = require('mongoose');
<<<<<<< HEAD

=======
const slugify = require('slugify');

// Schema biến thể sản phẩm
>>>>>>> a8a81ce (Final code)
const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  size: { type: String, required: true },
<<<<<<< HEAD
  material: { type: String, required: true }, // Thêm trường material vào đây
  additionalAttributes: {
    // Có thể thêm các thuộc tính tùy chọn khác nếu cần
  }
});

=======
  specs: [{
    label: { type: String, required: true },
    value: { type: String, required: true }
  }]
});

// Schema sản phẩm
>>>>>>> a8a81ce (Final code)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  description: { type: String, maxlength: 1000 },
  price: { type: Number, required: true, min: 0 },
<<<<<<< HEAD
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, enum: ['Laptop', 'Phone', 'Tablet', 'Console', 'Accessory'] },
=======
  category: { type: String, required: true, enum: ['Laptop', 'Phone', 'Tablet', 'Console', 'Accessory'] },
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'A list of tags is required'
    }
  },
>>>>>>> a8a81ce (Final code)
  variants: { type: [variantSchema], required: true },
  images: {
    type: [String],
    validate: {
      validator: function (v) {
<<<<<<< HEAD
        return v.every((url) => /^(https?:\/\/.+|\/uploads\/.+)/.test(url)); // Chấp nhận cả URL cục bộ và URL https
=======
        return v.every((url) => /^(https?:\/\/.+|\/uploads\/.+)/.test(url));
>>>>>>> a8a81ce (Final code)
      },
      message: 'Invalid URL format in images',
    },
  },
  isAvailable: { type: Boolean, default: true },
<<<<<<< HEAD
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
=======
  slug: { type: String, unique: true, required: true },
  stock: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

// Tạo slug trước khi lưu
productSchema.pre('validate', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Tính tổng stock trước khi lưu
productSchema.pre('save', function (next) {
  this.stock = this.variants.reduce((total, variant) => total + variant.stock, 0);
  next();
});

// Cập nhật tổng stock khi thay đổi biến thể sản phẩm
productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.variants) {
    update.stock = update.variants.reduce((total, variant) => total + variant.stock, 0);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
>>>>>>> a8a81ce (Final code)
