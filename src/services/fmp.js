const axios = require('axios').default


function toStockFromFmp(data) {
    let stock = {
        symbol: data.symbol,
        companyName: data.companyName,
        purchase: parseFloat(data.price),
        lastDiv: parseFloat(data.lastDiv),
        industry: data.industry,
        marketCap: parseInt(data.mktCap)
    }
    return stock
}

async function getStockFromFmp(symbol) {
    try {
        let fmpStock = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.FMPKEY}`);
        if (!fmpStock) return null;
        let stock = toStockFromFmp(fmpStock.data[0]);
        return stock;
    } catch (error) {
        throw (error);
    }
}

module.exports = { getStockFromFmp };