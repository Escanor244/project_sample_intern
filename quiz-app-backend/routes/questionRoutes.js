// routes/questionRoutes.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Create Question
router.post("/create", async (req, res) => {
  const { quiz_title, question_text, option_a, option_b, option_c, option_d, correct_option } = req.body;

  if (!quiz_title || !question_text || !option_a || !option_b || !option_c || !option_d || !correct_option) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Insert the question into the questions table with quiz_title
    const [result] = await db.query(
      "INSERT INTO question (quiz_title, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [quiz_title, question_text, option_a, option_b, option_c, option_d, correct_option]
    );

    res.status(201).json({ message: "Question added successfully", question_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add question" });
  }
});

// Get All Questions
router.get("/allq", async (req, res) => {
  try {
    const [questions] = await db.query("SELECT * FROM question");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Get Specific Question by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [question] = await db.query("SELECT * FROM question WHERE id = ?", [id]);
    if (question.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
});

// Delete Question by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM question WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
});

module.exports = router;
