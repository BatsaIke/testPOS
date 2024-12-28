const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: 'user', enum: ['user', 'moderator', 'admin'] },

  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },

});

const User = mongoose.model("user", UserSchema);

module.exports = User;

