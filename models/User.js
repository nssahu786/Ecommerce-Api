const mongoose = require('mongoose');
var jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: {
    public_id: {
      type: String,
     
    },
    url: {
      type: String,
     
    },
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

var userModel = mongoose.model('USERS', userSchema);
module.exports = userModel;