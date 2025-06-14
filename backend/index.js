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
  const user_api_key = req.query.user_api_key;

  if (!user_api_key) {
    return res.status(400).json({ error: "api_key parameter is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM targets WHERE user_api_key = $1",
      [user_api_key]
    );
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
    // check if user exists before adding target
    const userCheck = await pool.query(
      "SELECT 1 FROM users WHERE api_key = $1",
      [user_api_key]
    );
    if (userCheck.rowCount == 0) {
      return res
        .status(400)
        .json({ error: "Invalid user_api_key:  user does not exist" });
    }

    // check if target already exists
    const duplicateCheck = await pool.query(
      "SELECT 1 FROM targets WHERE user_api_key = $1 AND target_id = $2",
      [user_api_key, target_id]
    );
    if (duplicateCheck.rowCount > 0) {
      return res
        .status(400)
        .json({ error: "Target already exists for this user" });
    }

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
      return res.status(404).json({ error: "Target not found"} );
    }

    res.json({ message: "Target deleted"} );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
