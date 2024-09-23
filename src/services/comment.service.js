const commentModel = require('../models/comment.model')
const stockModel = require('../models/stock.model')
// const dateHelper = require('../utils/dateHelper')

exports.AddCommentToStock = async function (symbol, data) {
  const comment = await commentModel.AddComment(data)
  await stockModel.AddComment(symbol, comment)

  return comment
}

exports.GetCommentsForStock = async function (symbol) {
  const stock = await stockModel.GetComments(symbol)

  return stock.comments
}

exports.DeleteCommentFromStock = async function (symbol, commentId) {
  const stock = await stockModel.DeleteComment(commentId, symbol)
  await commentModel.DeleteById(commentId)
  return stock.comments
}
