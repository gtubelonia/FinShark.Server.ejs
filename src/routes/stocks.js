const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const stockController = require('../controllers/stocks/stock.controller')
const createStock = require('./validationSchemas/stockCreate')
const updateStock = require('./validationSchemas/stockUpdate')
const { param, checkSchema } = require('express-validator')

router.use(express.json())

router.get(
  '/:symbol',
  param('symbol').notEmpty().isAlpha(),
  asyncHandler(stockController.StockGet)
)

router.post(
  '/add',
  checkSchema(createStock),
  asyncHandler(stockController.StockCreate)
)

router.patch(
  '/update/:symbol',
  param('symbol').isAlpha(),
  checkSchema(updateStock),
  asyncHandler(stockController.StockUpdate)
)

router.delete(
  '/delete/:symbol',
  param('symbol').notEmpty().isAlpha(),
  asyncHandler(stockController.StockDelete)
)

module.exports = router
