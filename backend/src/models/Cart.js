const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    }
  ],
  voucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion'
  },
  shippingMethod: {
    type: String,
    enum: ['none', 'standard', 'express']
  },
  loyaltyPoints: {
    type: Number
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;