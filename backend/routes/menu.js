const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// GET: list
router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  GET by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const menu = await Menu.findOne({ _id: id });
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

// POST Create Menu
router.post("/", async (req, res) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const menu = req.body;
    const updatedMenu = await Menu.findOneAndUpdate(
      { _id: id },
      { $set: menu },
      { new: true }
    );
    res.status(204).json(updatedMenu);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let deletedMenu = await Menu.deleteOne({ _id: id });
    res.status(200).json(deletedMenu);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error });
  }
});

module.exports = router;
