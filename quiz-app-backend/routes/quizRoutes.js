// /routes/quizRoutes.js
const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Create Quiz
router.post("/create", async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await db.query("INSERT INTO quizzes (title, description) VALUES (?, ?)", [title, description]);
    res.status(201).json({ message: "Quiz created successfully", quizId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

module.exports = router;
