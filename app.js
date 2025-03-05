const express = require("express");
const cors = require("cors");
const app = express();

const passport = require("passport");
const { uuid } = require("uuidv4");
const mongoose = require("mongoose");
const session = require("express-session");
const port = 3000;

app.use(cors());
app.use(express.json());

const customerRoutes = require("./backend/routes/customers");
const childRoutes = require("./backend/routes/child");
const ingredientRoutes = require("./backend/routes/ingredients");
const allergenRoutes = require("./backend/routes/allergy");
const mealRoutes = require("./backend/routes/meal");

app.use("/api/customers", customerRoutes);
app.use("/api/child", childRoutes);
app.use("/api/allergen", allergenRoutes);
app.use("/api/ingredient", ingredientRoutes);
app.use("/api/meal", mealRoutes);

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
  const connectionString =
    "mongodb+srv://garethdeeney:7QGatOz2ffu9bMXh@cluster0.u7ujn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  await mongoose.connect(connectionString, { dbName: "schoolmealapp" });
  mongoose.set("strictQuery", true);
}
