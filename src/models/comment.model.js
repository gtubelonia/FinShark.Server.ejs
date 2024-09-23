const Comment = require('../mongoose/schemas/comment')

exports.AddComment = async function (data) {
  const newComment = new Comment(data)

  const savedComment = await newComment.save()

  return savedComment
}

exports.GetCommentsForStock = async function (symbol) {
  const comments = await Comment.find({ symbol }).exec()

  return comments
}

exports.DeleteById = async function (commentId) {
  const deletedComment = await Comment.deleteOne({ _id: commentId })

  return deletedComment
}
