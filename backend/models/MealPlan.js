const mongoose = require("mongoose");

const mealPlanSchema = mongoose.Schema({
  id: String,
  name: String,
  startDate: Date,
  monday: {
    date: Date,
    menu: Array,
  },
  tuesday: {
    date: Date,
    menu: Array,
  },
  wednesday: {
    date: Date,
    menu: Array,
  },
  thursday: {
    date: Date,
    menu: Array,
  },
  friday: {
    date: Date,
    menu: Array,
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
