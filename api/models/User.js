const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  phoneNumber: { type: String, unique: true },
  dob: Date,
  fullName: String,
  employeeStatus: String,
  investments: String,
  address: String,
  howLong: String,
  tellUs: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
