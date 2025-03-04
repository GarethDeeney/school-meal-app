const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// GET: list

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error.message });
  }
});

//  GET by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({ _id: id });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error.message });
  }
});

// POST Create Customer
router.post("/", async (req, res) => {
  try {
    const savedCustomer = await Customer.create(req.body);
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error.message });
  }
});

//  PUT: update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = req.body;
    const updatedCustomer = Customer.findOneAndUpdate(
      { _id: id },
      { $set: customer },
      { new: true }
    );
    res.status(204).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error.message });
  }
});

//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let deletedCustomer = await Customer.deleteOne({ _id: id });
    res.status(200).json(deletedCustomer);
  } catch (error) {
    res.status(400).json({ message: "An error occured: ", error: error.message });
  }
});

module.exports = router;
