const userService = require('../../services/user.service')
const { matchedData, validationResult } = require('express-validator')

async function GetPortfolio (req, res, next) {
  const portfolioList = await userService.GetPortfolio(req.session.passport.user.id)

  res.status(200).json(portfolioList)
}

async function RemovePortfolioItem (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.json(result.array())
  const params = matchedData(req, { locations: ['params'] })

  const updatedPortfolio = await userService.RemovePortfolioItem(req.session.passport.user.id, params.symbol)

  res.status(200).json(updatedPortfolio)
}

async function AddPortfolioItem (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const params = matchedData(req, { locations: ['params'] })

  const updatedPortfolio = await userService.AddPortfolioItem(req.session.passport.user.id, params.symbol)
  res.status(200).json(updatedPortfolio)
}

module.exports = { GetPortfolio, RemovePortfolioItem, AddPortfolioItem }
