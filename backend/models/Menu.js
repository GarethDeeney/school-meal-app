const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  id: String,
  name: String,
  meals: Array,
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
