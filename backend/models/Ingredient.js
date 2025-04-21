const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
  id: String,
  name: String,
  allergens: Array,
  pricePerKG: Number,
  nutrition: {
    energy: Number,
    fat: Number,
    saturates: Number,
    sugars: Number,
    salt: Number,
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
