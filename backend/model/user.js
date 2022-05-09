const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  token: String,
  confirmed: Boolean,
  google_access_token: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
