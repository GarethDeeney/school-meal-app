const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  id: String,
  name: String,
  ingredients: Array,
  vegetarian: Boolean,
  vegan: Boolean
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
