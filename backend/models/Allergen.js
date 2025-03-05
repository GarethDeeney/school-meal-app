const mongoose = require("mongoose");

const AllergenSchema = mongoose.Schema({
  id: String,
  name: String,
  reaction: String,
  specialRequirements: String,
});

const Allergen = mongoose.model("Allergen", AllergenSchema);

module.exports = Allergen;
