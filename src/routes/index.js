const express = require('express')

const usersRouter = require('./users')
const stocksRouter = require('./stocks')
const portfolioRouter = require('./portfolios')
const adminRouter = require('./admin')
const commentRouter = require('./comments')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('router home page')
})

router.use('/users', usersRouter)
router.use('/stocks', stocksRouter)
router.use('/admin', adminRouter)
router.use('/comments', commentRouter)
router.use('/portfolios', portfolioRouter)

module.exports = router
