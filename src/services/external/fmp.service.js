const axios = require('axios').default

// we are using FMP to pull stock data into the application
function toStockFromFmp (data) {
  const stock = {
    symbol: data.symbol,
    companyName: data.companyName,
    purchase: parseFloat(data.price),
    lastDiv: parseFloat(data.lastDiv),
    industry: data.industry,
    marketCap: parseInt(data.mktCap),
    sector: data.sector
  }
  return stock
}

exports.GetStockFromFmp = async function (symbol) {
  const fmpStock = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.FMPKEY}`)
  if (!fmpStock.data[0]) return null
  const stock = toStockFromFmp(fmpStock.data[0])
  return stock
}
