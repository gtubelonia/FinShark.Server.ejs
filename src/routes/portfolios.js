const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const { param } = require('express-validator')
const portfolioController = require('../controllers/portfolio/portfolio.controller')
const { isAuth } = require('../middleware/authMiddleware')

router.use(express.json())

router.get(
  '/',
  isAuth,
  asyncHandler(portfolioController.GetPortfolio)
)

router.patch(
  '/delete/:symbol',
  isAuth,
  param('symbol').notEmpty().escape().isAlpha(),
  asyncHandler(portfolioController.RemovePortfolioItem)
)

router.patch(
  '/add/:symbol',
  isAuth,
  param('symbol').notEmpty().escape().isAlpha(),
  asyncHandler(portfolioController.AddPortfolioItem)
)

module.exports = router
