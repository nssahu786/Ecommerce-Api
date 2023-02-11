const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 1
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "USERS",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  rating: {
    type: Number,
    required: true,
    default: 0,
  },

 

  category: {
    type: String,
    required: true
  },
  images: [   
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        
      },
    },
  ],
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "USERS",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });


const productModel = mongoose.model('products', productSchema);
module.exports = productModel;