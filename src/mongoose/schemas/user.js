const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User email required']
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  portfolio: {
    type: [mongoose.Types.ObjectId],
    ref: 'Stock',
    default: []
  }
},
{ versionKey: '__v' })

module.exports = mongoose.model('User', UserSchema)
