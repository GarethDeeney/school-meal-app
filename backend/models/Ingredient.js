const mongoose = require("mongoose");

const Nutrition = require('./Nutrition')

const ingredientSchema = mongoose.Schema({
  id:  String,
  name:  String,
  allergens:  Array,
  pricePerKG: Number,
  nutritionalInformation: Array
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
