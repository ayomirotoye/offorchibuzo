const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        sessionId: {
            type: String,
            required: true
        }
    },
    id: Number,
    items: {
        type: [[String]], 
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    status: {type: Boolean, default: false}
}, {timestamp: true});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;