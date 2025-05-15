const express = require("express");
const router = express.Router();
const Child = require("../models/Child");

// GET: list
router.get("/", async (req, res) => {
  try {
    const child = await Child.find();
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  GET by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const child = await Child.findOne({ _id: id });
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

router.get("/:id/nutrition", async (req, res) => {
  try {
    const id = req.params.id;
    const child = await Child.find({ _id: id }, { meals: 1, _id: 0 });
    const nutrition = getNutrition(child);

    res.status(200).json(nutrition);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

getNutrition = (child) => {
  const nutritionArr = child[0].meals.map((meal) =>
    meal.ingredients.map((ingredient) => ingredient.ingredient.nutrition)
  );

  return {
    energy: calcNutrition(nutritionArr.flat(), "energy"),
    fat: calcNutrition(nutritionArr.flat(), "fat"),
    salt: calcNutrition(nutritionArr.flat(), "salt"),
    saturates: calcNutrition(nutritionArr.flat(), "saturates"),
    sugars: calcNutrition(nutritionArr.flat(), "sugars"),
  };
};

const calcNutrition = (arr, prop) => {
  return (
    arr
      .map((nutrition) => nutrition[prop])
      .reduce((prev, current) => {
        return prev + current;
      }, 0) / arr.length
  );
};

// POST Create Child
router.post("/", async (req, res) => {
  try {
    const child = await Child.create(req.body);
    res.status(201).json(child);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const child = req.body;
    const updatedChild = await Child.findOneAndUpdate(
      { _id: id },
      { $set: child },
      { new: true }
    );

    res.status(204).json(updatedChild);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let deletedChild = await Child.deleteOne({ _id: id });
    res.status(200).json(deletedChild);
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occured: ", error: error.message });
  }
});

module.exports = router;
