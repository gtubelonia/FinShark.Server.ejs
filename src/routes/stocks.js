var express = require('express');
const asyncHandler = require('express-async-handler');
var router = express.Router();
const { StockAdd, StockUpdate } = require('../controllers/stocks/stockController');
const createStock = require('./validationSchemas/stockCreate');
const updateStock = require('./validationSchemas/stockUpdate')
const { param, checkSchema } = require('express-validator');

router.use(express.json())

router.get('/', function (req, res, next) {

  return res.send('stocks.js');
})


router.post(
  '/add',
  checkSchema(createStock),
  asyncHandler(StockAdd)
);

router.patch(
  '/update/:symbol',
  param('symbol').isAlpha(),
  checkSchema(updateStock),
  asyncHandler(StockUpdate)
);


module.exports = router;