const UpdateStockValidationSchema = {
  companyName: {
    optional: {
      options: {
        nullable: true
      }
    },
    isString: {
      errorMessage: 'Company Name must be a string!'
    }
  },
  purchase: {
    optional: {
      options: {
        nullable: true
      }
    },
    isCurrency: {
      options: {
        symbol: '$',
        require_symbol: false
      }
    }
  },
  lastDiv: {
    optional: {
      options: {
        nullable: true
      }
    },
    isCurrency: {
      options: {
        symbol: '$',
        require_symbol: false
      }
    }
  },
  industry: {
    optional: {
      options: {
        nullable: true
      }
    },
    isString: {
      errorMessage: 'Industry Name must be a string!'
    }
  },
  marketCap: {
    optional: {
      options: {
        nullable: true
      }
    },
    isCurrency: {
      options: {
        symbol: '$',
        require_symbol: false
      }
    }
  }
}

module.exports = UpdateStockValidationSchema
