import { Allergen } from "./allergen";
import { Ingredient } from "./ingredient";

const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  id: String,
  name:  String,
  ingredients:  Array,
  allergens: Array,
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;


export interface Meal {
  _id?: String,
  name:  String,
  ingredients:  Ingredient[],
  allergens: Allergen[],
}
