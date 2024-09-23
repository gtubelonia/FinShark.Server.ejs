const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const commentController = require('../controllers/comment/comment.controller')
// const { isAuth } = require('../middleware/authMiddleware')
const { param, body, checkSchema } = require('express-validator')
const createCommentValidationSchema = require('./validationSchemas/commentCreate')
// const updateCommentValidationSchema = require('./validationSchemas/commentUpdate')

router.get(
  '/:symbol',
  // isAuth,
  param('symbol').notEmpty().escape().isAlpha(),
  asyncHandler(commentController.GetCommentsForStock)
)

router.delete(
  '/delete/:symbol',
  // isAuth,
  param('symbol').notEmpty().escape().isAlpha(),
  body('id').notEmpty(),
  asyncHandler(commentController.DeleteCommentFromStock)
)

router.post(
  '/add/:symbol',
  // isAuth,
  param('symbol').notEmpty().escape().isAlpha(),
  checkSchema(createCommentValidationSchema),
  asyncHandler(commentController.AddCommentToStock)
)

module.exports = router
