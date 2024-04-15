const express = require("express");
const router = express.Router();
const { mealPlan, savePlan, getPlan } = require("../controller/planController");

router.post("/mealPlan", mealPlanValidator, mealPlan);
router.post("/savePlan", savePlan);
router.get("/getPlan/:date", getPlan);

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

module.exports = router;
