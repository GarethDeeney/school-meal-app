const mongoose = require("mongoose");

const allergenSchema = mongoose.Schema({
  id: String,
  name: String,
  reaction: String,
  specialRequirements: String
});

const Allergen = mongoose.model("Allergen", allergenSchema);

module.exports = Allergen;
