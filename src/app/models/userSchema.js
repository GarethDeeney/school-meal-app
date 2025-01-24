const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: String,
  emailAddress: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = Child;
