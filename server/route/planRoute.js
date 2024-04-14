const express = require("express");
const router = express.Router();
const { mealPlan, savePlan } = require("../controller/planController");

router.post("/mealPlan", mealPlanValidator, mealPlan);
router.post("/savePlan", savePlan);

function mealPlanValidator(req, res, next) {
  let { budget } = req.body;
  try {
    if (!budget) throw "Budget is required";
    budget = parseFloat(budget);
    if (isNaN(budget)) throw "Budget should be a numeric value";
    if (budget < 0) throw "Invalid budget";
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: true, message: error });
  }
}

function savePlanValidator(req, res, next) {
  try {
    let { budget, plan } = req.body;
    if (!budget) throw "Budget is required";
    budget = parseFloat(budget);
    if (isNaN(budget)) throw "Budget should be a numeric value";
    if (budget < 0) throw "Invalid budget";
    if (!plan?.length) throw "Invalid plan";
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: true, message: error });
  }
}

module.exports = router;

plan = [
  { day: 1, meal_type: "breakfast", meal_name: "sandwicch", price: "2" },
  { day: 1, meal_type: "lunch", meal_name: "burger", price: "212" },
  { day: 1, meal_type: "dinner", meal_name: "pizza", price: "4" },
];
