const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "../../assets/user.png",
    },
    role: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    courses: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;

module.exports.getUserById = (id, callback) => {
  Staff.findById(id, callback);
};

module.exports.getUserByUsername = (id, callback) => {
  const query = { username: username };
  Staff.findOne(query, callback);
};
