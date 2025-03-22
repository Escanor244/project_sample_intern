// routes/leaderboardRoutes.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get Leaderboard
router.get("/lead", async (req, res) => {
  try {
    const query = `
      SELECT l.team_id, t.team_name, l.total_score AS score
      FROM leader l
      JOIN team_details t ON l.team_id = t.id
      ORDER BY l.total_score DESC
      LIMIT 3  -- To show only top 3 teams
    `;

    const [leaderboard] = await db.query(query);
    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;
