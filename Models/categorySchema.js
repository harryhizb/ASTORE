import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema
({
 category:[],
 details:String,
  Event:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
      },

    ]


},

{
    timestamps: true,
},

);

export default mongoose.model('Category',categorySchema);