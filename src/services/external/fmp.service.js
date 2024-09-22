const axios = require('axios').default
const fmpUrl = 'https://financialmodelingprep.com/api'
const stockModel = require('../../models/stock.model')
const fs = require('node:fs/promises')
// we are using FMP to pull stock data into the application

function GetFmpApi(version, service, param, query = '') {

  if (query) {
    query = `?${query}&apikey=${process.env.FMPKEY}`
  } else {
    query = `?apikey=${process.env.FMPKEY}`
  }

  let url = `${fmpUrl}/${version}/${service}/${param}${query}`
  return url
}
function toStockFromFmp(data) {
  const date = new Date()

  const dateParts = {
    Year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  }
  const stock = {
    symbol: data.symbol,
    companyName: data.companyName,
    purchase: parseFloat(data.price),
    lastDiv: parseFloat(data.lastDiv),
    industry: data.industry,
    marketCap: parseInt(data.mktCap),
    sector: data.sector,
    lastUpdated: `${dateParts.Year}/${dateParts.month + 1}/${dateParts.date}`
  }
  return stock
}

exports.GetStockFromFmp = async function (symbol) {
  const url = GetFmpApi('v3', 'profile', symbol)
  const fmpStock = await axios.get(url)
  if (!fmpStock.data[0]) return null
  const stock = toStockFromFmp(fmpStock.data[0])
  return stock
}

exports.GetTradeableStocks = async function () {
  const url = GetFmpApi('v3', 'available-traded', 'list')
  const fmpList = await axios.get(url)

  return fmpList.data


}