const express = require('express');
const router = express.Router();
const { UserRegister } = require('../controllers/users/userController');
const { checkSchema } = require('express-validator');
const createUserValidationSchema = require('./validationSchemas/userCreate');
const asyncHandler = require('express-async-handler')
const passport = require('passport');

router.use(express.json())

router.post(
    '/login',
    passport.authenticate('local'),
    (req, res, next) => {
        console.log("cookie:", res.user);
        res.status(200).send(req.session.passport.user);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.post(
    '/register',
    checkSchema(createUserValidationSchema),
    asyncHandler(UserRegister)
);



module.exports = router;
