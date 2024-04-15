const pool = require("../database/database");

async function signUp(req, res) {
  const { username, name, email, password, height, age, weight, gender } = req.body;
  try {
    // Check if the username already exists in the database
    const userExistsQuery = `
      SELECT * FROM users 
      WHERE username = $1
    `;
    const userExistsResult = await pool.query(userExistsQuery, [username]);

    if (userExistsResult.rows.length > 0) {
      return res.status(400).json({ error: true, message: "Username already exists" });
    }

    // If the username doesn't exist, proceed with the sign-up process
    const insertQuery = `
      INSERT INTO users (username, name, email, password, height, age, weight, gender) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [username, name, email, password, height, age, weight, gender];
    await pool.query(insertQuery, values);

    return res.status(200).json({ error: false, message: `${name} has been saved` });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ error: true, message: error.message });
  }
}

async function signIn(req, res) {
  const { username, password } = req.body;
  try {
    const query = `
      SELECT password FROM users 
      WHERE username = $1
    `;
    const result = await pool.query(query, [username]);

    // No user found with the provided username
    if (result.rows.length === 0)
      return res.status(404).json({ error: true, message: "no user found" });

    const storedPassword = result.rows[0].password;
    if (password === storedPassword)
      // Passwords match, sign-in successful
      return res.status(200).json({ error: false, message: "Sign In success" });

    // Passwords do not match
    return res.status(400).json({ error: true, message: "Incorrect password" });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

module.exports = { signUp, signIn };
