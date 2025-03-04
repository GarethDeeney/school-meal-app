const express = require("express");
const router = express.Router();
const Child = require("../models/Child");

// GET: list
router.get("/", async (req, res) => {
  try {
    const child = await Child.find();
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  GET by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const child = await Child.findOne({ _id: id });
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

// POST Create Child
router.post("/", async (req, res) => {
  try {
    const child = await Child.create(req.body);
    res.status(201).json(child);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const child = req.body;
    const updatedChild = Child.findOneAndUpdate(
      { _id: id },
      { $set: child },
      { new: true }
    );
    res.status(204).json(updatedChild);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.body.params.id;
    let deletedChild = await Child.deleteOne({ _id: id });
    res.status(200).json(deletedChild);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

module.exports = router;
