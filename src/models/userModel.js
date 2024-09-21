const User = require('../mongoose/schemas/user')

exports.CreateUser = async function (data) {
  const newUser = new User(data)
  await newUser.save()
  return newUser
}
