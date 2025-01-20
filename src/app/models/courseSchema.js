const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a course name"],
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "../../assets/accounting.jpg",
    },
    courseProvider: {
      type: {
        id: String,
        name: String,
      },
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: true,
    },
    achieved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
