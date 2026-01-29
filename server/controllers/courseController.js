const Course = require("../models/Course");
const Progress = require("../models/Progress");

/* ======================================================
   CREATE COURSE
====================================================== */
// @desc    Create a new course
// @route   POST /api/courses
// @access  Private
const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description required" });
    }

    const course = await Course.create({
      title,
      description,
      price,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET ALL PUBLISHED COURSES (PUBLIC)
====================================================== */
// @desc    Get all published courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "instructor",
      "name email"
    );

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET INSTRUCTOR'S OWN COURSES
====================================================== */
// @desc    Get instructor's courses
// @route   GET /api/courses/my
// @access  Private
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   PUBLISH COURSE
====================================================== */
// @desc    Publish a course
// @route   PUT /api/courses/:id/publish
// @access  Private
const publishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    course.isPublished = true;
    await course.save();

    res.json({
      message: "Course published successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   ENROLL COURSE + AUTO CREATE PROGRESS
====================================================== */
// @desc    Enroll student in course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.isPublished) {
      return res.status(400).json({ message: "Course is not published" });
    }

    if (course.instructor.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Instructor cannot enroll" });
    }

    const alreadyEnrolled = course.enrolledStudents.includes(req.user._id);
    if (alreadyEnrolled) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    // enroll student
    course.enrolledStudents.push(req.user._id);
    await course.save();

    // auto-create progress
    const existingProgress = await Progress.findOne({
      student: req.user._id,
      course: course._id,
    });

    if (!existingProgress) {
      await Progress.create({
        student: req.user._id,
        course: course._id,
        completedLessons: [],
        progressPercent: 0,
        isCompleted: false,
      });
    }

    res.json({
      message: "Enrolled successfully",
      courseId: course._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   STUDENT DASHBOARD – ENROLLED COURSES
====================================================== */
// @desc    Get student's enrolled courses
// @route   GET /api/courses/enrolled
// @access  Private
const getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      enrolledStudents: req.user._id,
      isPublished: true,
    }).populate("instructor", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   INSTRUCTOR DASHBOARD
====================================================== */
// @desc    Instructor dashboard
// @route   GET /api/courses/instructor/dashboard
// @access  Private
const instructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    }).select("title isPublished enrolledStudents createdAt");

    const dashboardData = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      isPublished: course.isPublished,
      studentsCount: course.enrolledStudents.length,
      createdAt: course.createdAt,
    }));

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   EXPORTS
====================================================== */
module.exports = {
  createCourse,
  getAllCourses,
  getMyCourses,
  publishCourse,
  enrollCourse,
  getEnrolledCourses,
  instructorDashboard,
};
