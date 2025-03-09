const express = require("express");
const router = express.Router();
const Allergen = require("../models/Allergen");

// GET: list
router.get("/", async (req, res) => {
  try {
    const allergen = await Allergen.find();
    res.status(200).json(allergen);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  GET by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allergen = await Allergen.findOne({ _id: id });
    res.status(200).json(allergen);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

// POST Create Allergen
router.post("/", async (req, res) => {
  try {
    const allergen = await Allergen.create(req.body);
    res.status(201).json(allergen);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allergen = req.body;
    const updatedAllergen = await Allergen.findOneAndUpdate(
      { _id: id },
      { $set: allergen },
      { new: true }
    );
    res.status(204).json(updatedAllergen);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let deletedAllergen = await Allergen.deleteOne({ _id: id });
    res.status(200).json(deletedAllergen);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

module.exports = router;
