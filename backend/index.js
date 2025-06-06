const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // to parse incoming json

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend server running");
});

// target list
let targets = ["hi"];

// getting targets from backend
app.get("/api/targets", (req, res) => {
  res.json(targets);
});

// adding a new target
app.post("/api/targets", (req, res) => {
  const target = req.body.target;
  if (!target) {
    return res.status(400).json({ error: "Target is required" });
  }
  targets.push(target);
  res.status(201).json({ message: "Target added", targets });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
