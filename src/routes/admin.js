const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const adminController = require('../controllers/admin/admin.controller')

router.get('/update',
    asyncHandler(adminController.UpdateTradeableStockPrices)
)

module.exports = router
