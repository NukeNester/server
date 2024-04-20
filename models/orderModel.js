const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
    dateOrdered: { type: Date, required: true }, 
    wasteType: { type: Date, required: true }, 
    quantity: { type: Number, required: true },
    timeToDecay: { type: Date, required: true },
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;


