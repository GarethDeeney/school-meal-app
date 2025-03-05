const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");

// GET: list
router.get("/", async (req, res) => {
  try {
    const meal = await Meal.find();
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  GET by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const meal = await Meal.findOne({ _id: id });
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

// POST Create Meal
router.post("/", async (req, res) => {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const meal = req.body;
    const updatedMeal = Meal.findOneAndUpdate(
      { _id: id },
      { $set: meal },
      { new: true }
    );
    res.status(204).json(updatedMeal);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.body.params.id;
    let deletedMeal = await Meal.deleteOne({ _id: id });
    res.status(200).json(deletedMeal);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

module.exports = router;
