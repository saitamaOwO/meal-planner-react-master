const pool = require("../database/database");

async function getProfile(req, res) {
  const username = req.username;
  try {
    const user = await pool.query(`SELECT *FROM users where username='${username}'`);
    if (!user) return res.status(404).json({ error: true, message: "No user found" });
    return res
      .status(200)
      .json({ error: false, message: "Meal plan retrived", payload: user.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}
module.exports = { getProfile };
