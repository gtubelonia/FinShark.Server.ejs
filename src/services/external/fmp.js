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

async function getStockFromFmp (symbol) {
  try {
    const fmpStock = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.FMPKEY}`)
    if (!fmpStock) return null
    const stock = toStockFromFmp(fmpStock.data[0])
    return stock
  } catch (error) {
    throw (error)
  }
}

module.exports = { getStockFromFmp }
