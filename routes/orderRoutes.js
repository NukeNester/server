const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

// CREATE (POST)
router.post("/createOrder", async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL (GET)
router.get("/getAllOrder", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ BY ID (GET)
router.get("/getOrderByID/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//READ WITHIN AREA (GET)
router.get("/getOrderByArea", async (req, res) => {
  const { topLeft, bottomRight } = req.query;
  try {
    const orders = await Order.find({
      latitude: { $gte: bottomRight[1], $lte: topLeft[1] },
      longitude: { $gte: topLeft[0], $lte: bottomRight[0] },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ BY COMPANY NAME (GET)
router.get("/getOrderByCompany", async (req, res) => {
  const companyName = req.query.companyName;
  try {
    const orders = await Order.find({ organizationName: companyName });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ BY COMPANY NAME (GET)
router.get("/getOrderByCompany", async (req, res) => {
  const companyName = req.query.companyName;
  try {
    const orders = await Order.find({ organizationName: companyName });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ BY ORDER PLACED AFTER DATE (GET)
router.get("/getOrderAfterDate", async (req, res) => {
  const dateStr = req.query.date; // Assuming the date is passed as a query parameter in ISO format (e.g., "2024-04-22T00:00:00Z")
  try {
    const date = new Date(dateStr);
    const orders = await Order.find({ dateOrdered: { $gt: date } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE (PUT)
router.put("/updateOrderByID/:id", async (req, res) => {
  try {
    const { organizationName, dateOrdered, wasteType, quantity, timeToDecay } =
      req.body;
    if (organizationName) res.order.organizationName = organizationName;
    if (dateOrdered) res.order.dateOrdered = dateOrdered;
    if (wasteType) res.order.wasteType = wasteType;
    if (quantity) res.order.quantity = quantity;
    if (timeToDecay) res.order.timeToDecay = timeToDecay;
    await res.order.save();
    res.json(res.order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (DELETE)
router.delete("/deleteOrderByID/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
