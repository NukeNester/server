const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// CREATE (POST)
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL (GET)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE (GET)
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// UPDATE (PUT)
router.put('/:id', getOrder, async (req, res) => {
  try {
    const { organizationName, dateOrdered, wasteType, quantity, timeToDecay } = req.body;
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
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.order = order;
  next();
}

module.exports = router;
