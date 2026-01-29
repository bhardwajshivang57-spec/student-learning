const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  markLessonComplete,
  getProgress,
} = require("../controllers/progressController");

// Mark lesson complete
router.post("/complete", protect, markLessonComplete);

// Get progress for a course
router.get("/:courseId", protect, getProgress);

module.exports = router;
