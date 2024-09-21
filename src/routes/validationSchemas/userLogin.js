module.exports = loginUserValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: 'Username is required'
    },
    isString: {
      errorMessage: 'Username must be a string!'
    }
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required'
    },
    isString: {
      errorMessage: 'Password must be a string!'
    }
  }
}
