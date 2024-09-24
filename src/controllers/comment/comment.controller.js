const { matchedData, validationResult } = require('express-validator')
const commentService = require('../../services/comment.service')

exports.GetCommentsForStock = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const params = matchedData(req, { locations: ['params'] })

  const commentsList = await commentService.GetCommentsForStock(params.symbol)

  return res.status(200).json(commentsList)
}

exports.AddCommentToStock = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const body = matchedData(req, { locations: ['body'] })
  const params = matchedData(req, { locations: ['params'] })
  const user = req.session.passport.user

  body.createdBy = user.id

  const comment = await commentService.AddCommentToStock(params.symbol, body)

  return res.status(200).json(comment)
}

exports.DeleteCommentFromStock = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const body = matchedData(req, { locations: ['body'] })

  const params = matchedData(req, { locations: ['params'] })

  const commentsList = await commentService.DeleteCommentFromStock(params.symbol, body.id)

  return res.status(200).json(commentsList)
}
