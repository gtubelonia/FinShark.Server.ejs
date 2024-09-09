var express = require('express');

var usersRouter = require('./users');
var stocksRouter = require('./stocks');
var portfolioRouter = require('./portfolios')

var router = express.Router();

router.get('/', (req, res)=>{
    res.send('router home page');
})

router.use('/users', usersRouter);
router.use('/stocks', stocksRouter);
router.use('/portfolios', portfolioRouter);

module.exports = router;
