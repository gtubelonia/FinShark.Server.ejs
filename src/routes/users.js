var express = require('express');
var router = express.Router();

var { UserLogin, UserAdd } = require('../controllers/users/userController');
const { checkSchema } = require('express-validator');
const createUserValidationSchema = require('./validationSchemas/userCreate');
const asyncHandler = require('express-async-handler')
router.use(express.json())

router.post(
    '/add',
    checkSchema(createUserValidationSchema),
    asyncHandler(UserAdd)
);

router.get(
    '/login',
    UserLogin
);

module.exports = router;
