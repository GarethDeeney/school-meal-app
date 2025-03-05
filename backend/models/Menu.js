const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  id:  String,
  name:  String,
  meals:  Array,
  allergens: Array
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
