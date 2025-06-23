const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const Child = require("../models/Child");
const Ingredient = require("../models/Ingredient");

// what is required to create report
// get all childrens meals
// then calculate the average of each nturtition type?

// GET: nutrition report
router.get("/nutritionReport", async (req, res) => {
  try {
    const childMeals = await Child.find({}, { meals: 1, _id: 0 });

    const mealWithDate = childMeals
      .map((meal) => meal.meals)
      .flat()
      .map((meal) => {
        return {
          date: meal.date,
          ingredients: meal.ingredients,
        };
      })
      .filter((meal) => !!meal.ingredients.length);

    const totalNutrition = getNutrition(mealWithDate);

    res.status(200).json(totalNutrition);
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occured: ", error: error.message });
  }
});

getNutrition = (item) => {
  const months = {
    january: [],
    february: [],
    march: [],
    april: [],
    may: [],
    june: [],
    july: [],
    august: [],
    september: [],
    october: [],
    november: [],
    december: [],
  };

  const nutritionArr = item.map((item) => {
    return {
      date: item.date,
      nutrition: item.ingredients.map((item) => item.ingredient.nutrition),
    };
  });

  nutritionArr.forEach((element) => {
    const dateMonth = getNutritionMonth(element.date);
    months[dateMonth].push(element.nutrition);
  });

  // to do - get return for each month of year.

  // return {
  //   calories: calcNutrition(nutritionArr.flat(), "calories").toFixed(2),
  //   energy: calcNutrition(nutritionArr.flat(), "energy").toFixed(2),
  //   fat: calcNutrition(nutritionArr.flat(), "fat").toFixed(2),
  //   salt: calcNutrition(nutritionArr.flat(), "salt").toFixed(2),
  //   saturates: calcNutrition(nutritionArr.flat(), "saturates").toFixed(2),
  //   sugars: calcNutrition(nutritionArr.flat(), "sugars").toFixed(2),
  // };
};

getNutritionMonth = (date) => {
  return new Date(date)
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
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

module.exports = router;
