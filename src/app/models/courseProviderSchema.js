const mongoose = require("mongoose");
const CourseSchema = require("./courseSchema");

const courseProviderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  courses: {
    type: Array,
  },
});

const CourseProvider = mongoose.model("CourseProvider", courseProviderSchema);

module.exports = CourseProvider;
