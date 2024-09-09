const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { StockCreate, StockUpdate, StockDelete, StockGet } = require('../controllers/stocks/stockController');
const createStock = require('./validationSchemas/stockCreate');
const updateStock = require('./validationSchemas/stockUpdate')
const { param, checkSchema } = require('express-validator');
const {isAuth} = require('../middleware/authMiddleware');

router.use(express.json())

router.get(
  '/:symbol',
  param('symbol').notEmpty().isAlpha(),
  asyncHandler(StockGet)
);

router.post(
  '/add',
  checkSchema(createStock),
  asyncHandler(StockCreate)
);

router.patch(
  '/update/:symbol',
  param('symbol').isAlpha(),
  checkSchema(updateStock),
  asyncHandler(StockUpdate)
);

router.delete(
  '/delete/:symbol',
  param('symbol').notEmpty().isAlpha(),
  asyncHandler(StockDelete)
);

module.exports = router;