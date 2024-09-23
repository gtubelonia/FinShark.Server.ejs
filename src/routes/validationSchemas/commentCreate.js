const CreateUserValidationSchema = {
  createdBy: {
    isLength: {
      options: {
        min: 5,
        max: 32
      },
      errorMessage:
                'Username must be at least 5 characters with a max of 32 characters'
    },
    notEmpty: {
      errorMessage: 'createdBy is required'
    },
    isString: {
      errorMessage: 'createdBy must be a string!'
    }
  },
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
