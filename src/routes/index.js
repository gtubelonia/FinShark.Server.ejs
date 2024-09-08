var express = require('express');

var usersRouter = require('./users');
var stocksRouter = require('./stocks');

var router = express.Router();

router.get('/', (req, res)=>{
    res.send('router home page');
})

router.use('/users', usersRouter)
router.use('/stocks', stocksRouter);

module.exports = router;
