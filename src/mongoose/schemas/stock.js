var mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        unique: true
    },
    companyName: {
        type: String,
    },
    purchase: {
        type: mongoose.Types.Decimal128
    },
    lastDiv: {
        type: mongoose.Types.Decimal128
    },
    industry: {
        type: String,
    },
    marketCap: {
        type: Number
    },
})

module.exports = mongoose.model("Stock", StockSchema);