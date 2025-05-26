const express = require("express");
const router = express.Router();
const MealPlan = require("../models/MealPlan");

// GET: list
router.get("/", async (req, res) => {
  try {
    const mealPlan = await MealPlan.find();
    res.status(200).json(mealPlan);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

// POST Create MealPlan
router.post("/", async (req, res) => {
  try {
    const mealPlan = await MealPlan.create(req.body);
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const mealPlan = req.body;
    const updatedMeal = await MealPlan.findOneAndUpdate(
      { _id: id },
      { $set: mealPlan },
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
    console.log("trying to delete");
    const id = req.params.id;
    let deletedMeal = await MealPlan.deleteOne({ _id: id });
    res.status(200).json(deletedMeal);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

module.exports = router;
