const OrderModel = require('./models/orderModel')
const QModel = require('./models/Qmodel');


//THIS CLASS RETURNS A QUEUE INSTANCE.
class Queue {
    constructor() {
        if (Queue.instance) {
            return Queue.instance;
          }
        this.order =  Order;
        Queue.instance = this;
     
    }

    async enqueue(customer, quantity, destination) {
        const orderData = new this.order(customer, quantity, destination);
        await orderData.save();
        return this.getQueue();
    }

    async dequeue() {
        const oldestOrder = await OrderModel.findOneAndDelete({}, { sort: { createdAt: 1 } });
        return oldestOrder;
    }

    async remove(id) {
        const removeOrder = await OrderModel.findOneAndDelete({id : id });
        return removeOrder;
    }

    async getQueue(findQuery, sortQuery = { createdAt: 1 }, skip = 1, per_page = 10 ) {
        console.log(findQuery)
        const allOrders = await OrderModel.find(findQuery, {id: 1, username: 1, destination: 1,  _id: 0 }).sort(sortQuery).skip(skip).limit(per_page);
        return allOrders;
    }

}



//THIS CLASS RETURNS AN ORDER INSTANCE THAT IS ADDED TO THE QUEUE.
class Order {
    constructor(customer, quantity,destination) {
        this.customer = customer;
        this.quantity = quantity;
        this.destination = destination
        this.total =  this.calculateTotal(),
        this.id =  Math.floor(Math.random() * 10000);
    }

    async save() {
        const orderData = {
            username: this.customer,
            quantity: this.quantity,
            destination: this.destination,
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
