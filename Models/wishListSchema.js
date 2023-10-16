const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema(
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
    // You can add other fields relevant to the wishlist item here
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WishList', wishListSchema);
