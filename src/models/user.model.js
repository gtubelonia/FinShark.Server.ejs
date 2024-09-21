const User = require('../mongoose/schemas/user')

exports.CreateUser = async function (data) {
  const newUser = new User(data)
  await newUser.save()
  return newUser
}

exports.GetByEmail = async function (email) {
  const foundUser = await User.findOne({ email }).exec()
  return foundUser
}

exports.GetPortfolioList = async function (userId) {
  const user = await User.findById(userId).populate('portfolio')

  if (!user) throw new Error('This User Could Not Be Found')

  const portfolioList = {}
  for (const stock of user.portfolio) {
    const portfolio = portfolioList[stock.sector] ?? []
    portfolio.push(stock)

    portfolioList[stock.sector] = portfolio
  }

  return portfolioList
}

exports.RemovePortfolioItem = async function (userId, symbol) {
  const user = await User.findById(userId).populate('portfolio').exec()

  if (!user) throw new Error('This User Could Not Be Found')

  const i = user.portfolio.findIndex((stock) => {
    return stock.symbol === symbol
  })

  user.portfolio.splice(i, 1)
  await user.save()

  return user.portfolio
}

exports.AddPortfolioItem = async function (userId, newStock) {
  const user = await User.findById(userId).populate('portfolio').exec()

  if (!user) throw new Error('This User Could Not Be Found')

  const i = user.portfolio.findIndex((stock) => {
    return stock.symbol === newStock.symbol
  })

  if (i > 0) throw new Error('Stock is already in portfolio')

  user.portfolio.push(newStock)

  await user.save()

  return user.portfolio
}
