const express = require("express");
const app = express();
const pool = require("./database/database");
const cors = require("cors");
app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/", (req, res, next) => {
  console.log({ method: req.method, ip: req.ip, route: req.route });
  next();
});

const authRoute = require("./route/authRoute");
const { error } = require("console");

app.use("/api", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const query = `
      SELECT password FROM users 
      WHERE username = $1
    `;
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: true, message: "Please login again" });
    const storedPassword = result.rows[0].password;
    if (password !== storedPassword)
      return res.status(400).json({ error: true, message: "Session expired, please login again" });
    return next();
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
});
app.use("/auth", authRoute);

app.all("/", (req, res) =>
  res.status(200).json({ error: false, message: "Backend working properly" })
);
app.all("*", (req, res) => {
  res.status(404).json({ error: true, message: "No route found" });
});
app.listen(8080, console.log("Server running at http://localhost:8080"));
