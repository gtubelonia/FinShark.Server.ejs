var Stock = require('../../mongoose/schemas/stock');
var User = require('../../mongoose/schemas/user');
var { matchedData, validationResult } = require('express-validator');
var axios = require('axios').default;
var { getStockFromFmp } = require('../../services/fmp')

async function GetPortfolio(req, res, next) {
    console.log(req.session.passport.user);

    try {
        let foundUser = await User.findById(req.session.passport.user.id).populate('portfolio').exec();
        if (!foundUser) {
            return res.status(400).send("This User Could Not Be Found")
        }

        res.status(200).send(foundUser.portfolio);
    } catch (error) {
        next(error);
    }
}

async function RemovePortfolioItem(req, res, next) {
    console.log(req.query.symbol);
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    try {
        let foundUser = await User.findById(req.session.passport.user).populate('portfolio').exec();
        if (!foundUser) {
            return res.status(400).send("This User Could Not Be Found")
        }

        let i = foundUser.portfolio.findIndex((stock) => {
            return stock.symbol == data.symbol;
        });
        foundUser.portfolio.splice(i, 1);

        await foundUser.save();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

async function AddPortfolioItem(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    try {
        let foundUser = await User.findById(req.session.passport.user.id).populate('portfolio').exec();
        if (!foundUser) {
            return res.status(400).send("This User Could Not Be Found");
        }

        let foundStock = await Stock.findOne({ symbol: data.symbol });
        if (!foundStock) {

            let newStock = await getStockFromFmp(data.symbol);
            if (!newStock) {
                return res.status(400).send("This Stock Could Not Be Found");
            }
            
            foundStock = new Stock(newStock);
            await foundStock.save();
        }

        let i = foundUser.portfolio.findIndex((stock) => {
            return stock.symbol == data.symbol;
        });
        if (i >= 0) {
            return res.status(400).send("Stock is already in portfolio");
        }

        foundUser.portfolio.push(foundStock);

        await foundUser.save();

        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
}

module.exports = { GetPortfolio, RemovePortfolioItem, AddPortfolioItem };