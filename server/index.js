const express = require("express");
const app = express();
const pool = require("./database/database");
const cors = require("cors");

// config
app.use(cors());
app.use(express.json());
app.use("/", (req, res, next) => {
  console.log({ method: req.method, ip: req.ip, route: req.url });
  next();
});

const authRoute = require("./route/authRoute");
const planRoute = require("./route/planRoute");

async function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const username = authHeader && authHeader.split(" ")[1];
  const password = authHeader && authHeader.split(" ")[2];
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
    req.username = username;
    return next();
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}
app.use("/api", authenticate);

app.use("/auth", authRoute);
app.use("/api/plan", planRoute);

app.all("/", (req, res) =>
  res.status(200).json({ error: false, message: "Backend working properly", payload: req.body })
);
app.all("*", (req, res) => {
  res.status(404).json({ error: true, message: "Invalid API Call", body: req.body });
});
app.listen(8080, console.log("Server running at http://localhost:8080"));
