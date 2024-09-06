var express = require('express');

var usersRouter = require('./users/users');
var stocksRouter = require('./stocks/stocks');
var portfolioRouter = require('./portfolio/portfolio')

var router = express.Router();

router.get('/', (req, res)=>{
    res.send('router home page');
})

router.use('/users', usersRouter)
router.use('/stocks', stocksRouter);
router.use('/portfolio', portfolioRouter);

module.exports = router;
