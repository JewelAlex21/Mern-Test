const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  phoneNumber: { type: String, unique: true },
  dob: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
