const pool = require("../database/database");

async function getPlan(budget) {
  try {
    const client = await pool.connect();
    // Call the stored procedure to get the meal plan
    const result = await client.query('SELECT * FROM generate_meal_plan($1)', [budget]);
    client.release();
    console.log('Retrieved meal plan data:', result.rows); // Log retrieved meal plan data
    return result.rows;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    throw error;
  }
}

module.exports = { getPlan };
