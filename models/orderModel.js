const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    organizationName: { type: String, required: true },
    dateOrdered: { type: Date, required: true }, 
    wasteType: { type: String, required: true }, 
    quantity: { type: Number, required: true },
    timeToDecay: { type: Date, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});


const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;


