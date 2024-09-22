const fmpService = require('../../services/external/fmp.service')
const stockService = require('../../services/stock.service')

exports.UpdateTradeableStockPrices = async function (req, res, next) {
    const tradeableStocks = await fmpService.GetTradeableStocks()
    await stockService.UpdateStockPrices(tradeableStocks)
    return res.sendStatus(200)
}