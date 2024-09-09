var { argonHash, argonVerify } = require('../../utils/hash');
var User = require('../../mongoose/schemas/user');
var Stock = require('../../mongoose/schemas/stock');
var { matchedData, validationResult } = require('express-validator');

async function UserLogin(req, res, next) {

    const { email, password } = req.body;

    try {
        var foundUser = await User.findOne({ email: email }).exec();

        if (!foundUser) {
            return res.status(400).send({ msg: "Bad Request. Could not find user based on credentials" });
        }

        let verify = await argonVerify(foundUser.password, password)

        if (verify) {
            req.session.visited = true;
            req.session.user = foundUser.userName;
            return res.status(200).send("Login Successful");
        } else {
            return res.status(400).send({ msg: "Bad Request. Could not find user based on credentials" });
        }
    } catch (err) {
        next(err);
    }

}

async function UserAdd(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    try {
        data.password = await argonHash(data.password);

        var foundUser = await User.findOne({ email: data.email }).exec();
        if (foundUser) {
            return res.status(400).send("This email has already been registered")
        }
        const newUser = new User(data);
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (err) {
        return (next(err));
    }
};

async function UserGetPortfolio(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    console.log(data.id)
    try {
        let foundUser = await User.findById(data.id).populate('portfolio').exec();
        if (!foundUser) {
            return res.status(400).send("This User Could Not Be Found")
        }

        res.status(200).send(foundUser.portfolio);
    } catch (error) {
        next(error);
    }
}

async function UserRemovePortfolioItem(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    console.log(data)
    try {
        let foundUser = await User.findById(data.id).populate('portfolio').exec();
        if (!foundUser) {
            return res.status(400).send("This User Could Not Be Found")
        }

        let i = foundUser.portfolio.findIndex((stock) => {
            return stock.symbol == data.symbol;
        });
        foundUser.portfolio.splice(i, 1);

        await foundUser.save();
        res.status(200).send(foundUser.portfolio);
    } catch (error) {
        next(error);
    }
}

async function UserAddPortfolioItem(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const data = matchedData(req);
    try {
        let foundUser = await User.findById(data.id).populate('portfolio').exec();
        if (!foundUser) {
            return res.status(400).send("This User Could Not Be Found");
        }

        let foundStock = await Stock.findOne({ symbol: data.symbol });
        if (!foundStock) {
            return res.status(400).send("This stock Could Not Be Found");
        }

        let i = foundUser.portfolio.findIndex((stock) => {
            return stock.symbol == data.symbol;
        });
        if (i >= 0) {
            return res.status(400).send("Stock is already in portfolio");
        }

        foundUser.portfolio.push(foundStock);

        await foundUser.save();

        res.status(200).send(foundUser.portfolio);
    } catch (error) {
        next(error);
    }
}

module.exports = { UserLogin, UserAdd, UserGetPortfolio, UserRemovePortfolioItem, UserAddPortfolioItem }