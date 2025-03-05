const express = require("express");
const router = express.Router();
const Ingredient = require("../models/Ingredient");

// GET: list
router.get("/", async (req, res) => {
  try {
    const ingredient = await Ingredient.find();
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  GET by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ingredient = await Ingredient.findOne({ _id: id });
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

// POST Create Ingredient
router.post("/", async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ingredient = req.body;
    const updatedIngredient = Ingredient.findOneAndUpdate(
      { _id: id },
      { $set: ingredient },
      { new: true }
    );
    res.status(204).json(updatedIngredient);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.body.params.id;
    let deletedIngredient = await Ingredient.deleteOne({ _id: id });
    res.status(200).json(deletedIngredient);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

module.exports = router;
