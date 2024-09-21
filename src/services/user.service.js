const hash = require('../utils/hash')
const userModel = require('../models/userModel')
exports.CreateUser = async function (data) {
  const foundUser = await User.findOne({ email: data.email }).exec()

  if (foundUser) { throw { status: 400, message: 'This email has already been registered' } }

  data.password = await hash.argonHash(data.password)

  const newUser = userModel.CreateUser(data)

  return newUser
}
