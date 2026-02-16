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
  getCourseById
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

// ================= PUBLIC ROUTES =================

// Get all published courses
router.get("/", getAllCourses);

// ================= PRIVATE ROUTES =================

// ⚠️ IMPORTANT: Specific routes FIRST

// Get student's enrolled courses
router.get("/enrolled", protect, getEnrolledCourses);

// Instructor dashboard
router.get("/instructor/dashboard", protect, instructorDashboard);

// Get instructor's own courses
router.get("/my", protect, getMyCourses);

// Create new course
router.post("/", protect, createCourse);

// Enroll in course
router.post("/:id/enroll", protect, enrollCourse);

// Publish course
router.put("/:id/publish", protect, publishCourse);

// ================= DYNAMIC ROUTE (ALWAYS LAST) =================

// Get single course by ID
router.get("/:id", getCourseById);

module.exports = router;
