const mongoose = require("mongoose");

const mealPlanSchema = mongoose.Schema({
  id: String,
  name: String,
  startDate: Date,
  monday: {
    date: Date,
    menu: {
      _id: String,
      name: String,
      meals: Array,
    },
  },
  tuesday: {
    date: Date,
    menu: {
      _id: String,
      name: String,
      meals: Array,
    },
  },
  wednesday: {
    date: Date,
    menu: {
     _id: String,
      name: String,
      meals: Array,
    },
  },
  thursday: {
    date: Date,
    menu: {
      _id: String,
      name: String,
      meals: Array,
    },
  },
  friday: {
    date: Date,
    menu: {
      _id: String,
      name: String,
      meals: Array,
    },
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
