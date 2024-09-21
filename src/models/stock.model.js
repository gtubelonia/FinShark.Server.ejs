const Stock = require('../mongoose/schemas/stock')

exports.Create = async function (data) {
  const newStock = new Stock(data)

  const savedStock = await newStock.save()

  return savedStock
}

exports.GetBySymbol = async function (symbol) {
  const stock = await Stock.findOne({ symbol }).exec()

  return stock
}

exports.UpdateBySymbol = async function (symbol, data) {
  const stock = await Stock.findOne({ symbol }).exec()

  if (!stock) { return stock }

  for (const key in data) {
    stock[key] = data[key]
  }

  const savedStock = await stock.save()

  return savedStock
}

exports.DeleteBySymbol = async function (symbol) {
  const deletedStock = await Stock.findOneAndDelete({ symbol }).exec()
  return deletedStock
}
