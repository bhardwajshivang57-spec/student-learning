const Progress = require("../models/Progress");

/* ======================================================
   MARK LESSON COMPLETE
====================================================== */
// @desc    Mark lesson as completed
// @route   POST /api/progress/complete
// @access  Private (Student)
const markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId, totalLessons } = req.body;

    if (!courseId || !lessonId || !totalLessons) {
      return res.status(400).json({
        message: "courseId, lessonId and totalLessons are required",
      });
    }

    // find progress for this student & course
    const progress = await Progress.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    // prevent duplicate lesson completion
    if (progress.completedLessons.includes(lessonId)) {
      return res.status(400).json({
        message: "Lesson already marked as completed",
      });
    }

    // add lesson
    progress.completedLessons.push(lessonId);

    // calculate progress percentage
    const completedCount = progress.completedLessons.length;
    const percent = Math.round((completedCount / totalLessons) * 100);

    progress.progressPercent = percent;
    progress.isCompleted = percent === 100;

    await progress.save();

    res.json({
      message: "Lesson marked as completed",
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   GET PROGRESS (STUDENT VIEW)
====================================================== */
// @desc    Get progress of a course for logged-in student
// @route   GET /api/progress/:courseId
// @access  Private (Student)
const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      student: req.user._id,
      course: courseId,
    }).populate("course", "title description");

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   EXPORTS
====================================================== */
module.exports = {
  markLessonComplete,
  getProgress,
};
