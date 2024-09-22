const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    unique: true
  },
  companyName: {
    type: String
  },
  purchase: {
    type: mongoose.Types.Decimal128,
    get: parseToFloat
  },
  lastDiv: {
    type: mongoose.Types.Decimal128,
    get: parseToFloat
  },
  industry: {
    type: String
  },
  marketCap: {
    type: Number
  },
  sector: {
    type: String
  },
  lastUpdated:{
    type: String
  }
})

function parseToFloat (num) {
  return parseFloat(num)
}
module.exports = mongoose.model('Stock', StockSchema)
