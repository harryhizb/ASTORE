const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color:[],

    Events:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Events',
        },
  
      ]
  },

 
  {
    timestamps: true, // Automatically include createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Offer', offerSchema);
