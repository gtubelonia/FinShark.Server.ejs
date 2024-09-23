const userService = require('../../services/user.service')
const { matchedData, validationResult } = require('express-validator')
const ToUserDto = require('./dto/userDto')

exports.UserLogin = async function (req, res, next) {
  return res.status(200).send(req.session.passport.user)
}

exports.UserLogout = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.sendStatus(200)
  })
}

exports.UserRegister = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const body = matchedData(req, { locations: ['body'] })

  const newUser = await userService.CreateUser(body)

  return res.status(201).json(ToUserDto(newUser))
}
