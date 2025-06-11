const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json()); // to parse incoming json

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend server running");
});

// getting targets from database
app.get("/api/targets", async (req, res) => {
  const api_key = req.query.api_key;

  if (!api_key) {
    return res.status(400).json({ error: "api_key parameter is required" });
  }

  try {
    const result = await pool.query("SELECT * FROM targets WHERE user_api_key = $1", [api_key]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

// adding a new target
app.post("/api/targets", async (req, res) => {
  const { user_api_key, target_id } = req.body;

  if (!user_api_key || !target_id) {
    return res
      .status(400)
      .json({ error: "user_api_key and target_id are required" });
  }

  try {
    await pool.query(
      "INSERT INTO targets (user_api_key, target_id) VALUES ($1, $2)",
      [user_api_key, target_id]
    );
    res.status(201).json({ message: "Target added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
