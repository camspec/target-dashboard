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

// adding a new user
app.post("/api/users", async (req, res) => {
  const api_key = req.body.api_key;

  if (!api_key) {
    return res.status(400).json({ error: "api_key is required" });
  }

  try {
    // check if user already exists
    const duplicateCheck = await pool.query(
      "SELECT 1 FROM users WHERE api_key = $1",
      [api_key]
    );
    if (duplicateCheck.rowCount > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    await pool.query("INSERT INTO users (api_key) VALUES ($1)", [api_key]);
    res.status(201).json({ message: "User added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// fetch a specific user
// targets are fetched via api key and everything else is external,
// but we'll still store user settings
app.get("/api/users", async (req, res) => {
  const api_key = req.params.api_key;

  try {
    const result = await pool.query("SELECT * FROM users WHERE api_key = $1", [
      api_key,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
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
    // check if user exists before adding target
    const userCheck = await pool.query(
      "SELECT 1 FROM users WHERE api_key = $1",
      [user_api_key]
    );
    if (userCheck.rowCount == 0) {
      return res
        .status(400)
        .json({ error: "Invalid user_api_key: user does not exist" });
    }

    // check if target already exists
    const duplicateCheck = await pool.query(
      "SELECT 1 FROM targets WHERE user_api_key = $1 AND target_id = $2",
      [user_api_key, target_id]
    );
    if (duplicateCheck.rowCount > 0) {
      return res
        .status(409)
        .json({ error: "Target already exists for this user" });
    }

    await pool.query(
      "INSERT INTO targets (user_api_key, target_id) VALUES ($1, $2)",
      [user_api_key, target_id]
    );
    res.status(201).json({ message: "Target added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// getting targets from database
app.get("/api/targets", async (req, res) => {
  const user_api_key = req.query.user_api_key;

  if (!user_api_key) {
    return res.status(400).json({ error: "user_api_key is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM targets WHERE user_api_key = $1",
      [user_api_key]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// deleting a target
app.delete("/api/targets", async (req, res) => {
  const { user_api_key, target_id } = req.body;

  if (!user_api_key || !target_id) {
    return res
      .status(400)
      .json({ error: "user_api_key and target_id are required" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM targets WHERE user_api_key = $1 AND target_id = $2",
      [user_api_key, target_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Target not found" });
    }

    res.json({ message: "Target deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
