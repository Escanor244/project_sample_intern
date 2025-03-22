// routes/answerRoutes.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Submit Answers
router.post("/submit", async (req, res) => {
  const { team_id, answers } = req.body; // `answers` is an array of objects containing `question_id` and `selected_option`

  if (!team_id || !answers || answers.length === 0) {
    return res.status(400).json({ error: "Team ID and answers are required" });
  }

  try {
    // Use Promise.all to execute multiple insert queries concurrently
    await Promise.all(
      answers.map(async (answer) => {
        const { question_id, selected_option } = answer;
        await db.query(
          "INSERT INTO ans (team_id, question_id, selected_option) VALUES (?, ?, ?)",
          [team_id, question_id, selected_option]
        );
      })
    );

    // After answers submission, update leaderboard
    await updateLeaderboard(team_id);

    res.status(201).json({ message: "Answers submitted successfully" });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ error: "Failed to submit answers" });
  }
});

// Function to update leaderboard after submission
// Function to update leaderboard after submission
async function updateLeaderboard(team_id) {
  try {
    console.log(`Updating leaderboard for team: ${team_id}`);

    // Count the correct answers for the team
    const query = `
      SELECT COUNT(a.id) AS correct_answers
      FROM ans a
      JOIN questions q ON a.question_id = q.id
      WHERE a.team_id = ? AND a.selected_option = q.correct_option
    `;

    const [rows] = await db.query(query, [team_id]);

    if (!rows || rows.length === 0) {
      console.error(`No correct answers found for Team ${team_id}.`);
      return;
    }

    const score = rows[0].correct_answers || 0;

    console.log(`Calculated score for Team ${team_id}: ${score}`);

    // Check if the team already exists in the leaderboard
    const [existingTeam] = await db.query('SELECT total_score FROM leader WHERE team_id = ?', [team_id]);

    if (existingTeam.length > 0) {
      // Update score if the team already exists
      const updateQuery = `
        UPDATE leader 
        SET total_score = total_score + ? 
        WHERE team_id = ?
      `;
      await db.query(updateQuery, [score, team_id]);
      console.log(`Leaderboard updated: Team ${team_id}, Total Score Updated by ${score}`);
    } else {
      // Insert a new entry if the team does not exist in the leaderboard
      const insertQuery = 'INSERT INTO leader (team_id, total_score) VALUES (?, ?)';
      await db.query(insertQuery, [team_id, score]);
      console.log(`Leaderboard created for Team ${team_id} with initial score of ${score}`);
    }
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
}



  
  // Get Top 3 Teams from Leaderboard
// router.get("/leaderboard", async (req, res) => {
//     try {
//       const query = `
//         SELECT team_id, total_score 
//         FROM \`lead\` 
//         ORDER BY total_score DESC 
//         LIMIT 3
//       `;
  
//       const [rows] = await db.query(query);
  
//       res.status(200).json({ leaderboard: rows });
//     } catch (error) {
//       console.error("Error fetching leaderboard:", error);
//       res.status(500).json({ error: "Failed to fetch leaderboard" });
//     }
//   });
  

module.exports = router;
