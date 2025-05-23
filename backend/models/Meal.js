const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  id: String,
  name: String,
  ingredients: Array,
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
