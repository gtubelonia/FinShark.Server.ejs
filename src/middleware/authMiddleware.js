const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ msg: 'You need proper authorization' })
  }
}

// TODO finish adming role
// isAdmin = (req, res, next) => {

// }

module.exports = { isAuth }
