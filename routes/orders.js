var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is a list of orders');
});

router.post('/', function(req, res, next) {
  res.send('you created a new order');
});


router.put('/:orderId', function(req, res, next) {
  res.send('you updated an order');
});


router.delete('/:orderId', function(req, res, next) {
  res.send('you deleted an order');
});

router.delete('/clear', function(req, res, next) {
  res.send('you deleted all orders');
});

module.exports = router;
