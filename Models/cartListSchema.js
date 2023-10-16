const mongoose = require('mongoose');

const cartListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events', // Reference to the Event schema
      required: true,
    },
    quantity: {
      type: Number,
      default: 1, // Default quantity if not specified
    },
    // You can add other fields relevant to the cart item here
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartListSchema);
