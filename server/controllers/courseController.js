const Course = require("../models/Course");
const Progress = require("../models/Progress");

/* ======================================================
   CREATE COURSE
====================================================== */
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
      price: price || 0,
      instructor: req.user._id,
      enrolledStudents: [],   // 🔥 important
      isPublished: false,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET ALL PUBLISHED COURSES
====================================================== */
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate("instructor", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET SINGLE COURSE
====================================================== */
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET MY COURSES (Instructor)
====================================================== */
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    }).populate("instructor", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   PUBLISH COURSE
====================================================== */
const publishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({ message: "Course not found" });

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
   ENROLL COURSE
====================================================== */
const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course)
      return res.status(404).json({ message: "Course not found" });

    if (!course.isPublished)
      return res.status(400).json({ message: "Course not published" });

    if (course.instructor.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "Instructor cannot enroll in own course",
      });
    }

    // 🔥 make sure array exists
    if (!course.enrolledStudents) {
      course.enrolledStudents = [];
    }

    const alreadyEnrolled = course.enrolledStudents.some(
      (studentId) => studentId.toString() === req.user._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "Already enrolled in this course",
      });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    // create progress if not exists
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET ENROLLED COURSES (Student)
====================================================== */
const getEnrolledCourses = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "No user found in request" });
    }

    const courses = await Course.find({
      enrolledStudents: req.user._id,
      isPublished: true,
    }).populate("instructor", "name email");

    console.log("COURSES FOUND:", courses.length);

    res.json(courses);
  } catch (error) {
    console.error("ENROLLED ERROR FULL:", error);
    res.status(500).json({ message: error.message });
  }
};



/* ======================================================
   INSTRUCTOR DASHBOARD
====================================================== */
const instructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    });

    const dashboardData = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      isPublished: course.isPublished,
      studentsCount: course.enrolledStudents?.length || 0,
      createdAt: course.createdAt,
    }));

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  getMyCourses,
  publishCourse,
  enrollCourse,
  getEnrolledCourses,
  instructorDashboard,
};
