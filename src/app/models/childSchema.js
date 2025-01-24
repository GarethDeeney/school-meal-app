const mongoose = require("mongoose");

const childSchema = mongoose.Schema({
  id: String,
  name: String,
  allergies: Array,
  year: String,
  meals: Array,
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
