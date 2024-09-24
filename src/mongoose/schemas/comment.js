const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  dateCreated: {
    type: String
  },
  dateUpdated: {
    type: String
  }
})

module.exports = mongoose.model('Comment', CommentSchema)
