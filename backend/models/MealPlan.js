const mongoose = require("mongoose");

const mealPlanSchema = mongoose.Schema({
  id: String,
  name: String,
  monday: {
    date: Date,
    meals: Array,
  },
  tuesday: {
    date: Date,
    meals: Array,
  },
  wednesday: {
    date: Date,
    meals: Array,
  },
  thursday: {
    date: Date,
    meals: Array,
  },
  friday: {
    date: Date,
    meals: Array,
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
