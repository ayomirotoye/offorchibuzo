const OrderModel = require('./models/orderModel')
const QModel = require('./models/Qmodel');


//THIS CLASS RETURNS A QUEUE INSTANCE.
class Queue {
    constructor() {
        if (Queue.instance) {
            return Queue.instance;
          }
        this.orderModel =  Order;
        Queue.instance = this;
     
    }

    async enqueue(customer, quantity) {
        const orderData = new this.orderModel(customer, quantity);
        await orderData.save();
        return this.getQueue();
    }

    async dequeue() {
        const oldestOrder = await OrderModel.findOneAndDelete({}, { sort: { createdAt: 1 } });
        return oldestOrder;
    }

    length() {
        this.queue.length();
    }

    async remove(id) {
        const removeOrder = await OrderModel.findOneAndDelete({id : id });
        return removeOrder;
    }

    async getQueue() {
        const allOrders = await OrderModel.find({},  { username: 1, id: 1, _id: 0 }).sort({ created_at: 1 });
        return allOrders;
    }
}



//THIS CLASS RETURNS AN ORDER INSTANCE THAT IS ADDED TO THE QUEUE.
class Order {
    constructor(customer, quantity) {
        this.customer = customer;
        this.quantity = quantity;
        this.total =  this.calculateTotal(),
        this.id =  Math.floor(Math.random() * 10000);
    }

    async save() {
        const orderData = {
            username: this.customer,
            quantity: this.quantity,
            id: this.id,
            total: this.total,
        };
        const order = new OrderModel(orderData);
        await order.save();
        return order.id;
    }

    async remove(id) {
         const order =  OrderModel.deleteOne({id: id});
        return order.id;
    }

    calculateTotal() {
        let total = this.quantity * 2000;
        return total;
    }
}

const orderQueue = new Queue();


module.exports = { Order, orderQueue };
