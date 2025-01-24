const mongoose = require("mongoose");

const nutritionSchema = require('./nutrtionSchema')

const ingredientSchema = mongoose.Schema({
  id:  String,
  name:  String,
  allergens:  Array,
  pricePerKG: Number,
  nutritionalInformation: nutritionSchema
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
