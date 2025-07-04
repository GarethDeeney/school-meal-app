const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const Child = require("../models/Child");
const Ingredient = require("../models/Ingredient");

// what is required to create report
// get all childrens meals
// then calculate the average of each nturtition type?

// GET: nutrition report
router.get("/nutrition-report", async (req, res) => {
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

    const nutirtionPerMonth = getNutrition(mealWithDate);

    res.status(200).json(nutirtionPerMonth);
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occured: ", error: error.message });
  }
});

// GET: cost report
router.get("/cost-report", async (req, res) => {
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

    const costPerMonth = getCostsPerMonth(mealWithDate);

    res.status(200).json(costPerMonth);
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occured: ", error: error.message });
  }
});

getCostsPerMonth = (item) => {
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

  const costArr = item.map((item) => {
    return {
      date: item.date,
      cost: item.ingredients.map((item) =>
        costOfIngredient(item.ingredient.pricePerKG, item.amount)
      ),
    };
  });

  costArr.forEach((element) => {
    const dateMonth = getMonth(element.date);
    months[dateMonth].push(element.cost.flat());
  });

  const keys = Object.keys(months);

  const returnObj = {};

  for (key of keys) {
    const flatArr = months[key].flat();
    returnObj[key] = calcCostTotal(flatArr).toFixed(2);
  }
  return returnObj;
};

costOfIngredient = (costPerKg, amount) => {
  return (amount / 100) * costPerKg;
};

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
    const dateMonth = getMonth(element.date);
    months[dateMonth].push(element.nutrition.flat());
  });

  const keys = Object.keys(months);

  const returnObj = {};

  for (key of keys) {
    const flatArr = months[key].flat();
    returnObj[key] = {
      calories: calcNutrition(flatArr, "calories").toFixed(2),
      energy: calcNutrition(flatArr, "energy").toFixed(2),
      fat: calcNutrition(flatArr, "fat").toFixed(2),
      salt: calcNutrition(flatArr, "salt").toFixed(2),
      saturates: calcNutrition(flatArr, "saturates").toFixed(2),
      sugars: calcNutrition(flatArr, "sugars").toFixed(2),
    };
  }

  return returnObj;
};

getMonth = (date) => {
  return new Date(date)
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
};

calcCostTotal = (arr) => {
  return arr.reduce((prev, current) => prev + current, 0);
};

const calcNutrition = (arr, prop) => {
  const nutritionVal =
    arr
      .map((nutrition) => nutrition[prop])
      .reduce((prev, current) => prev + current, 0) / arr.length ?? 0;

  return !isNaN(nutritionVal) ? nutritionVal : 0;
};

module.exports = router;
