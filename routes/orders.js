const express = require('express');
const router = express.Router();
const { Order, orderQueue } = require("../services/orderObj");




//Get List of orders
router.get('/', async function(req, res, next) {
  try {
   
const { 
    username, 
    destination,
    quantity,
    order = 'asc', 
    order_by = 'createdAt', 
    page = 1, 
    per_page = 10 
} = req.query;

const skip = (page - 1) * per_page;
const findQuery = {};

if (username) {
  findQuery.username = username;
}

if (destination) {
    findQuery.destination = destination;
}
if (quantity) {
    findQuery.quantity = quantity;
} 

const sortQuery = {};

const sortAttributes = order_by.split(',')
for (const attribute of sortAttributes) {
    if (order === 'asc' && order_by) {
        sortQuery[attribute] = 1
    }

    if (order === 'desc' && order_by) {
        sortQuery[attribute] = -1
    }
  }

  let orderQ = await orderQueue.getQueue(findQuery, sortQuery, skip, per_page);

  return res.status(200).json({ status: true, q: orderQ })
  } catch (err) {
      return res.status(500).json({error: err.message})
  }
});


//Create a new order
router.post('/create', async function(req, res, next) {
  try{
    const { username, quantity, destination } = req.body;

    let orderQ = await orderQueue.enqueue(username, quantity, destination)

      return res.status(200).json({message: 'Order created successfully', orderQ})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }   
});

//This removes the first item from the queue
router.put('/next', async function(req, res, next) {
  try{
    let ord = await orderQueue.dequeue();

      return res.status(200).json({message: `${ord.username}, with id: ${ord.id} check out successful`, });
    } catch (err){
return next(err);
}
})

//This deletes an item from the queue
router.delete('/:id', async function(req, res, next) {
  try{
    const { id } = req.params;

    let ord = await orderQueue.remove(id);

      return res.status(200).json({message: `${ord.username}, with id: ${ord.id} removed successfully`, });
    } catch (err){
return next(err);
}
});

module.exports = router;
