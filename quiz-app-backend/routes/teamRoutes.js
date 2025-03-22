// routes/teamRoutes.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Register Team with members and quiz_id
router.post("/register", async (req, res) => {
  const { team_name, quiz_title, members } = req.body;

  if (!team_name || !quiz_title || !members || !Array.isArray(members)) {
    return res.status(400).json({ error: "Team name, quiz title, and members are required" });
  }

  try {
    // Step 1: Get quiz_id from quizzes table
    const [quizResult] = await db.query("SELECT id FROM quizzes WHERE title = ?", [quiz_title]);
    if (quizResult.length === 0) {
      return res.status(400).json({ error: "Quiz not found" });
    }
    const quiz_id = quizResult[0].id;

    // Step 2: Convert members array into a string
    const membersString = members.join(", ");

    // Step 3: Insert team data
    const [teamResult] = await db.query("INSERT INTO team_details (team_name, quiz_id, members) VALUES (?, ?, ?)", [team_name, quiz_id, membersString]);

    res.status(201).json({
      message: "Team registered successfully",
      team_name,
      quiz_id,
      members: membersString
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register team" });
  }
});

// Get All Teams
router.get("/all", async (req, res) => {
  try {
    const [teams] = await db.query("SELECT * FROM team_details");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// Get Team by Name
router.get("/:team_name", async (req, res) => {
  const { team_name } = req.params;

  try {
    const [team] = await db.query("SELECT * FROM team_details WHERE team_name = ?", [team_name]);
    if (team.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team" });
  }
});

// Delete Team by Name
router.delete("/:team_name", async (req, res) => {
  const { team_name } = req.params;

  try {
    const [result] = await db.query("DELETE FROM team_details WHERE team_name = ?", [team_name]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team" });
  }
});

module.exports = router;
