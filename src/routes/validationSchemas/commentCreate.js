const CreateUserValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: 'title is required'
    }
  },
  content: {
    notEmpty: {
      errorMessage: 'content is required'
    },
    isString: {
      errorMessage: 'conent must be a string'

    }

  }
}
module.exports = CreateUserValidationSchema
