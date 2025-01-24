const mongoose = require("mongoose");

const nutritionSchema = mongoose.Schema({
  energy:  Number,
  fat:  Number,
  saturates:  Number,
  sugars: Number,
  salt: Number

});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);

module.exports = Nutrition;
