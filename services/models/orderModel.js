const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    id: Number,
    destination: {
        type: String, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, { timestamps : true });

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;