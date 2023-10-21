import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    weight : Number,
    category: [],
    imageUrls:[],
    status: {
      type: String,
      enum: ['Available', 'Not Available'],
      default: 'Available',
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer', // Reference to the Offer schema
    },
    // Add an array of picture URLs
   
  },
  {
    timestamps: true,
  }
);


export default mongoose.model('Events', EventSchema);
