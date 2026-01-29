const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getEnrolledCourses,
  instructorDashboard,
  getMyCourses,
  enrollCourse,
  publishCourse,
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

// Public: get all published courses
router.get("/", getAllCourses);

// Private: create new course
router.post("/", protect, createCourse);

// Get student's enrolled courses
router.get("/enrolled", protect, getEnrolledCourses);

// Instructor dashboard
router.get("/instructor/dashboard", protect, instructorDashboard);

// Private: get instructor's courses
router.get("/my", protect, getMyCourses);

// Enroll in course
router.post("/:id/enroll", protect, enrollCourse);

// Publish course
router.put("/:id/publish", protect, publishCourse);

module.exports = router;
