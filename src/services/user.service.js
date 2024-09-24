const hash = require('../utils/hash')
const userModel = require('../models/user.model')
const stockModel = require('../models/stock.model')
const fmpService = require('./external/fmp.service')
const dateHelper = require('../utils/dateHelper')

exports.CreateUser = async function (data) {
  const foundUser = await userModel.GetByEmail(data.email)

  if (foundUser) throw new Error('This email has already been registered')

  data.password = await hash.ArgonHash(data.password)

  const newUser = userModel.CreateUser(data)

  return newUser
}

exports.GetPortfolio = async function (userId) {
  const portfolio = await userModel.GetPortfolioList(userId)

  return portfolio
}

exports.RemovePortfolioItem = async function (userId, symbol) {
  const portfolioList = await userModel.RemovePortfolioItem(userId, symbol)

  return portfolioList
}

exports.AddPortfolioItem = async function (userId, symbol) {
  let foundStock = await stockModel.GetBySymbol(symbol)

  if (!foundStock) {
    const newStock = await fmpService.GetStockFromFmp(symbol)
    if (!newStock) throw new Error('This Stock Could Not Be Found')
    foundStock = await stockModel.Create(newStock)
  } else if (foundStock.lastUpdated !== dateHelper.GetCurrentDate()) {
    const newStock = await fmpService.GetStockFromFmp(symbol)
    foundStock = await stockModel.UpdateBySymbol(symbol, newStock)
  }

  const portfolioList = await userModel.AddPortfolioItem(userId, foundStock)

  return portfolioList
}
