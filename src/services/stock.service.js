const stockModel = require('../models/stock.model')

exports.CreateStock = async function (data) {
  const foundStock = await stockModel.GetBySymbol(data.symbol)
  if (foundStock) throw new Error('This Stock has already been added')

  const newStock = await stockModel.Create(data)

  return newStock
}

exports.UpdateStock = async function (symbol, data) {
  const updatedStock = await stockModel.UpdateBySymbol(symbol, data)

  if (!updatedStock) throw new Error('This Stock Does Not Exist')

  return updatedStock
}

exports.DeleteStock = async function (data) {
  const deletedStock = await stockModel.DeleteBySymbol(data.symbol)

  if (!deletedStock) throw new Error('This Stock Does Not Exist')

  return deletedStock
}

exports.GetStock = async function (symbol) {
  const foundStock = await stockModel.GetBySymbol(symbol)

  if (!foundStock) throw new Error('This Stock Does Not Exist')

  return foundStock
}
