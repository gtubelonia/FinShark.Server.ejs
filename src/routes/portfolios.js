const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const { query } = require('express-validator')
const { GetPortfolio, RemovePortfolioItem, AddPortfolioItem } = require('../controllers/portfolio/portfolioController')
const { isAuth } = require('../middleware/authMiddleware')

router.use(express.json())

router.get(
  '/',
  isAuth,
  asyncHandler(GetPortfolio)
)

router.patch(
  '/delete',
  isAuth,
  query('symbol').notEmpty().escape().isAlpha(),
  asyncHandler(RemovePortfolioItem)
)

router.patch(
  '/add',
  isAuth,
  query('symbol').notEmpty().escape().isAlpha(),
  asyncHandler(AddPortfolioItem)
)

module.exports = router
