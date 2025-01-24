const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const { uuid } = require("uuidv4");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoString =
  "mongodb+srv://garethdeeney:7QGatOz2ffu9bMXh@cluster0.u7ujn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const port = 3000;
const path = require("path");

app.use(express.static(process.cwd() + "/dist/my-app"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//bodyparser middleware
app.use(bodyParser.json());

//routes

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/dist/my-app");
});

//Course API

// app.get("/api/course", async (req, res) => {
//   try {
//     if (req.query.role) {
//       const role = req.query.role;
//       const courses = await Course.find({ role: role }).sort({
//         name: 1,
//       });
//       res.status(200).json(courses);
//     } else {
//       const courses = await Course.find();
//       res.status(200).json(courses);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/", function (req, res) {
//   res.send("id: " + req.query.id);
// });

// app.get("/api/course/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const course = await Course.findById(id);
//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/course", async (req, res) => {
//   try {
//     const course = await Course.create(req.body);
//     res.status(201).json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.put("/api/course/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const course = await Course.findByIdAndUpdate(id, req.body);
//     if (!course) {
//       res.status(404).json({ message: `Cannot find course with ${id}` });
//     }
//     const updatedCourse = await Course.findById(id);
//     res.status(204).json(updatedCourse);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.delete("/api/course/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const course = await Course.findById(id);
//     const courseToDelete = await Course.deleteOne({ _id: id });
//     res.status(202).json(`${course.name} deleted`);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Course Provder API

// app.post("/api/courseprovider", async (req, res) => {
//   try {
//     const courseProvider = await CourseProvider.create(req.body);
//     res.status(201).json(courseProvider);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.put("/api/courseprovider/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const courseProvider = await CourseProvider.findByIdAndUpdate(id, req.body);

//     if (!courseProvider) {
//       res.status(404).json({ message: `Cannot find course with ${id}` });
//     }
    
//     const updatedCourseProvider = await CourseProvider.findById(id);
//     res.status(204).json(updatedCourseProvider);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Staff API

// app.get("/api/staff", async (req, res) => {
//   try {
//     if (req.query._id) {
//       const staff = await Staff.find({ _id: req.query._id });
//       res.status(200).json(staff);
//     } else if (req.query.username) {
//       const staffDetails = await Staff.find({ username: req.query.username });
//       res.status(200).json(staffDetails);
//     } else {
//       const staff = await Staff.find();
//       res.status(200).json(staff);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/api/staff/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const staff = await Staff.findById(id);
//     res.status(200).json(staff);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/staff", async (req, res) => {
//   try {
//     const staff = await Staff.create(req.body);
//     res.status(200).json(staff);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.put("/api/staff/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const staff = await Staff.findByIdAndUpdate(id, req.body);
//     if (!staff) {
//       res.status(404).json({ message: `Cannot find staff with ${id}` });
//     }
//     const updatedStaff = await Staff.findById(id);
//     res.status(200).json(updatedStaff);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get("/api/courseprovider", async (req, res) => {
//   try {
//     const courseProvider = await CourseProvider.find();
//     res.status(200).json(courseProvider);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("/api/courseprovider", async (req, res) => {
//   try {
//     const courseProvider = await CourseProvider.create(req.body);
//     res.status(200).json(courseProvider);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

mongoose
  .connect(mongoString, {
    dbName: 'schoolmealapp'
  })
  .then(() => {
    app.listen(port, () => {
      console.log("app running on port 3000");
    });
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error);
  });

//nuke the test data
app.delete("/api/courses", async (req, res) => {
  await Course.deleteOne({});
  res.status(200).json("Deleted Successfully");
});

app.delete("/api/staff", async (req, res) => {
  await Staff.deleteOne({});
  res.status(200).json("Deleted Successfully");
});
