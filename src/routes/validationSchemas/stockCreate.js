const CreateStockValidationSchema = {
  symbol: {
    notEmpty: {
      errorMessage: 'Stock Symbol is required'
    },
    isString: {
      errorMessage: 'Stock Symbol must be a string!'
    }
  },
  companyName: {
    isString: {
      errorMessage: 'Company Name must be a string!'
    }
  },
  purchase: {
    isCurrency: {
      options: {
        symbol: '$',
        require_symbol: false
      }
    }
  },
  lastDiv: {
    isCurrency: {
      options: {
        symbol: '$',
        require_symbol: false
      }
    }
  },
  industry: {
    isString: {
      errorMessage: 'Industry Name must be a string!'
    }
  },
  marketCap: {
    isCurrency: {
      options: {
        symbol: '$',
        require_symbol: false
      }
    }
  }
}

module.exports = CreateStockValidationSchema
