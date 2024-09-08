var Stock = require('../../mongoose/schemas/stock');
var { matchedData, validationResult } = require('express-validator');

async function StockAdd(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    try {
        var foundStock = await Stock.findOne({ symbol: data.symbol }).exec();
        if (foundStock) {
            return res.status(400).send("This Stock has already been added")
        }
        const newStock = new Stock(data);
        const savedStock = await newStock.save();
        return res.status(201).send(savedStock);
    } catch (err) {
        return (next(err));
    }
}

async function StockUpdate(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const body = matchedData(req, { locations: ['body'] });
    const params = matchedData(req, { locations: ['params'] });

    try {
        var foundStock = await Stock.findOne({ symbol: params.symbol }).exec();
        if (!foundStock) {
            return res.status(400).send("This Stock does not exist")
        }

        for (var key in body) {
            foundStock[key] = body[key];
        }

        const updatedStock = await foundStock.save();
        return res.status(201).send(updatedStock);
    } catch (err) {
        return (next(err));
    }
}
module.exports = { StockAdd, StockUpdate }