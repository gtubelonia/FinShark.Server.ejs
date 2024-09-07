var express = require('express');
var router = express.Router();

var { UserLogin, UserAdd } = require('../controllers/users/users.handlers');
const { checkSchema } = require('express-validator');
const createUserValidationSchema = require('./validationSchemas/createUser');
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
