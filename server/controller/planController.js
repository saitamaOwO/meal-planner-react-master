const pool = require("../database/database");

async function mealPlan(req, res) {
  const { budget } = req.body;
  try {
    const result = await pool.query(`SELECT * FROM generates_plans(${budget})`);
    return res
      .status(200)
      .json({ error: false, message: "Meal plan retrived", payload: result.rows });
  } catch (error) {
    console.error(error);
    if (error.code == "P0001")
      return res.status(400).json({
        error: true,
        message: "No meal plan can be created. Insufficient budget for Meal plan.",
      });

    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

async function savePlan(req, res) {
  const username = req.username;
  const { plan, budget } = req.body;

  try {
    for (const meal of plan) {
      const { day, meal_type, meal_name, price, calories, total_calories } = meal;
      const query = `
        INSERT INTO all_plan_details (username, day, meal_type, meal_name, price, budget, calories, total_calories) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await pool.query(query, [
        username,
        day,
        meal_type,
        meal_name,
        price,
        budget,
        calories,
        total_calories,
      ]);
    }

    return res.status(200).json({ error: false, message: "Plan saved" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

async function getPlan(req, res) {
  const username = req.username;
  const date = req.params.date;
  try {
    const savedPlan = await pool.query(`select *from get_dmeals('${date}', '${username}');`);
    if (!savedPlan.rowCount)
      return res.status(404).json({ error: true, message: "No saved plans found" });
    return res.status(200).json({ error: false, message: "Plan data", payload: savedPlan.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

module.exports = { mealPlan, savePlan, getPlan };
