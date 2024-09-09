const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ msg: 'You need proper authorization' });
    }
};

isAdmin = (req, res, next) => {

};

module.exports = { isAuth, isAdmin };