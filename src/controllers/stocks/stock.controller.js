const { matchedData, validationResult } = require('express-validator')
const stockService = require('../../services/stock.service')

exports.StockCreate = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const body = matchedData(req, { locations: ['body'] })

  const newStock = await stockService.CreateStock(body)

  return res.status(201).json(newStock)
}

exports.StockUpdate = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const body = matchedData(req, { locations: ['body'] })
  const params = matchedData(req, { locations: ['params'] })

  const updatedStock = await stockService.UpdateStock(params.symbol, body)

  return res.status(201).send(updatedStock)
}

exports.StockDelete = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const params = matchedData(req, { locations: ['params'] })

  const deletedStock = await stockService.DeleteStock(params)

  return res.status(204).json(deletedStock)
}

exports.StockGet = async function (req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) return res.send(result.array())
  const params = matchedData(req, { locations: ['params'] })

  const foundStock = await stockService.GetStock(params.symbol)

  return res.status(200).json(foundStock)
}
