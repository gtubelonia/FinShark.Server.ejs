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

exports.InsertOrUpdate = async function (data) {
  const stock = await Stock.findOneAndUpdate({ symbol: data.symbol }, data, {
    new: true,
    upsert: true
  }).exec()

  return stock
}

exports.AddComment = async function (symbol, newComment) {
  const stock = await Stock.findOne({ symbol }).populate('comments')

  stock.comments.push(newComment)

  await stock.save()
  return stock
}

exports.GetComments = async function (symbol) {
  const stock = await Stock.findOne({ symbol }).populate('comments')

  return stock
}

exports.DeleteComment = async function (commentId, symbol) {
  const stock = await Stock.findOne({ symbol }).populate('comments')

  console.log(stock)
  const i = stock.comments.findIndex((comment) => {
    return comment.id === commentId
  })

  stock.comments.splice(i, 1)

  const savedStock = await stock.save()
  return savedStock
}
