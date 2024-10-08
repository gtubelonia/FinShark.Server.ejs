const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
require('./strategies/local')
const corsOptions = require('./middleware/corsConfig')
const routes = require('./routes/index')

const app = express()

mongoose.connect('mongodb://localhost:27017/finshark')
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(`Error:${err}`))
mongoose.set('toJSON', { getters: true })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60
  }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(corsOptions))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.json(err.message)
})

module.exports = app
