// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const teamRoutes = require("./routes/teamRoutes");
const answerRoutes = require("./routes/answerRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const questionRoutes = require("./routes/questionRoutes"); // Import new question routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/question", questionRoutes); // Add route for creating questions

// Test Route
app.get("/", (req, res) => {
  res.send("Quiz App Backend is Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
