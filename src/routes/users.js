var express = require('express');
var router = express.Router();
var { UserLogin, UserAdd, UserGetPortfolio, UserRemovePortfolioItem, UserAddPortfolioItem } = require('../controllers/users/userController');
const { param, body, checkSchema } = require('express-validator');
const createUserValidationSchema = require('./validationSchemas/userCreate');
const asyncHandler = require('express-async-handler')
const passport = require('passport');


router.use(express.json())

router.get(
    '/login',
    passport.authenticate('local'),
    (req, res, next) => {
        res.sendStatus(200);
    }
);

router.get("/logout", (req, res, next) => {
    console.log(req.session)

    req.logout((err) => {
        if (err) {
            return next(err);
        }
        console.log("After: ", req.session)

        res.sendStatus(200);
    });
});

router.post(
    '/add',
    checkSchema(createUserValidationSchema),
    asyncHandler(UserAdd)
);

router.get(
    '/:id/portfolio',
    param('id').notEmpty(),
    asyncHandler(UserGetPortfolio)
);

router.delete(
    '/:id/portfolio',
    param('id').notEmpty(),
    asyncHandler(UserGetPortfolio)
);

router.patch(
    '/:id/portfolio/',
    param('id').notEmpty(),
    body('symbol').notEmpty().isAlpha(),
    asyncHandler(UserRemovePortfolioItem)
);

router.patch(
    '/:id/portfolio/add',
    param('id').notEmpty(),
    body('symbol').notEmpty().isAlpha(),
    asyncHandler(UserAddPortfolioItem)
);

module.exports = router;
