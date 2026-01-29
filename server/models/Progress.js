const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLessons: [
      {
        type: String, // lesson id / slug (for now)
      },
    ],

    progressPercent: {
      type: Number,
      default: 0,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure one progress per student per course
progressSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
