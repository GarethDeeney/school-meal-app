const mongoose = require("mongoose");

const ChildSchema = mongoose.Schema({
  id: String,
  name: String,
  allergies: Array,
  year: String,
  meals: Array,
});

const Child = mongoose.model("Child", ChildSchema);

module.exports = Child;
