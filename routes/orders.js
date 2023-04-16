const express = require('express');
const router = express.Router();
const { Order, orderQueue } = require("../services/orderObj");
const logger = require('morgan');



//Get List of orders
router.get('/', async function(req, res, next) {
    let Q = await orderQueue.getQueue();
    res.status(200).json({ orders: Q});
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

//Create a new order
router.post('/create', async function(req, res, next) {
  try{
    const {username, quantity } = req.body;

    let orderQ = await orderQueue.enqueue(username, quantity)

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
router.delete('/clear', async function(req, res, next) {
  try{
    const { id } = req.body;

    let ord = await orderQueue.remove(id);

      return res.status(200).json({message: `${ord.username}, with id: ${ord.id} removed successfully`, });
    } catch (err){
return next(err);
}
});

module.exports = router;
