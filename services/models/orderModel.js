const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    id: Number,
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