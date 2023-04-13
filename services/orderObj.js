const OrderModel = require('../models/order')


class OrderQueue {
    constructor() {
        this.queue = [];
        this.length = length;
        this.enqueue = enqueue;
        this.dequeue = dequeue;
    }

    enqueue(id) {
        this.queue.push(id);
    }

    dequeue() {
        this.queue.shift();
    }

    length() {
        this.queue.length();
    }

}


class Order {
    constructor(customer, quantity) {
        this.customer = customer;
        this.quantity = quantity;
        this.total =  this.calculateTotal(),
        this.status = false;
        this.id =  Math.floor(Math.random() * 10000);
    }

    async save() {
        const orderData = {
            customer: { sessionId: this.customer} ,
            quantity: this.quantity,
            totalCost: this.calculateTotal(),
            status: this.status,
            id: this.id
        };
        const order = new OrderModel(orderData);
        await order.save();
        return order._id;
    }

    calculateTotal() {
        let total = 0;
        this.items.forEach(item => {
           
            total += Number(item[1]);
        });
       
        return total;
    }

    getOrderDetails() {
        const orderItems = this.items;
        return { items: orderItems, total: this.calculateTotal()};
    }
}

module.exports = Order;
