exports.CreateUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32
      },
      errorMessage:
                'Username must be at least 5 characters with a max of 32 characters'
    },
    notEmpty: {
      errorMessage: 'Username is required'
    },
    isString: {
      errorMessage: 'Username must be a string!'
    }
  },
  email: {
    notEmpty: {
      errorMessage: 'email is required'
    },
    isEmail: {
      errorMessage: 'Please enter a valid email'
    }
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isAlphanumeric: true
  }
}
