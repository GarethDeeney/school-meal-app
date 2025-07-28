const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const port = 3000;

app.use(cors());
app.use(express.json());

const childRoutes = require("./backend/routes/child");
const ingredientRoutes = require("./backend/routes/ingredients");
const allergenRoutes = require("./backend/routes/allergy");
const mealRoutes = require("./backend/routes/meal");
const menuRoutes = require("./backend/routes/menu");
const mealPlanRoutes = require("./backend/routes/mealPlan");
const reportRoutes = require("./backend/routes/reports");

app.use("/api/child", childRoutes);
app.use("/api/allergen", allergenRoutes);
app.use("/api/ingredient", ingredientRoutes);
app.use("/api/meal", mealRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/mealPlan", mealPlanRoutes);
app.use("/api/reports", reportRoutes);

app.listen(port, (err) => {
  if (!err) {
    console.log("server is listening successfully at port: " + port);
  } else {
    console.error("Error: " + err);
  }
});

main().catch((err) => {
  console.error(err);
});

async function main() {
  const connectionString = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.u7ujn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  await mongoose.connect(connectionString, { dbName: "schoolmealapp" });
  mongoose.set("strictQuery", true);
}
