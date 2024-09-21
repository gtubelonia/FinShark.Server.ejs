const express = require('express')
const router = express.Router()
const userController = require('../controllers/users/userController')
const { checkSchema } = require('express-validator')
const createUserValidationSchema = require('./validationSchemas/userCreate')
const asyncHandler = require('express-async-handler')
const passport = require('passport')

router.use(express.json())

router.post(
  '/login',
  passport.authenticate('local'),
  asyncHandler(userController.UserLoggedin)
)

router.get('/logout',
  userController.UserLogout
)

router.post(
  '/register',
  checkSchema(createUserValidationSchema),
  asyncHandler(userController.UserRegister)
)

module.exports = router
