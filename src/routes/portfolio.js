var express = require('express');
var router = express.Router();
router.use(express.json())

router.get('/', function (req, res, next) {

    return res.send('portfolio.js');
  })


  module.exports = router;