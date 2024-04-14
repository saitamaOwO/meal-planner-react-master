const pool = require("../database/database");

async function mealPlan(req, res) {
  const { budget } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM generate_meal_plan(${budget})`);
    return res
      .status(200)
      .json({ error: false, message: "Meal plan retrived", payload: result.rows });
  } catch (error) {
    console.error(error);
    if (error.code == "P0001")
      return res
        .status(400)
        .json({
          error: true,
          message: "No meal plan can be created. Insufficient budget for Meal plan.",
        });

    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

module.exports = { mealPlan };
