var express = require('express');
var router = express.Router();
var User = require('../../mongoose/schemas/user');
var { query, validationResult } = require('express-validator');
var { argonHash, argonVerify } = require('../../utils/hash');
router.use(express.json())

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('users.js');
  console.log(req.query);
});

router.post('/add', async (req, res, next) => {
  const { body } = req;
  // TODO: add validation for request body
  // const result = validationResult(req);
  // if(!result.isEmpty()) return res.send(result.array());
  //const data = matchData(req);
  body.password = await argonHash(body.password);
  const newUser = new User(body);

  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser)
  } catch (error) {
    console.log(error + ": manual");
    return res.sendStatus(400)
  }
})

/*GET specific User*/
router.get('/login', async (req, res, next) => {

  const { username, password } = req.body;

  try {
    var foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) {
      return res.status(400).send({ msg: "Bad Request. Could not find user based on credentials" });
    }

    let verify = await argonVerify(foundUser.password, password)
    
    if (verify) {
      return res.send(foundUser);
    } else {
      return res.status(400).send({ msg: "Bad Request. Could not find user based on credentials" });
    }
  } catch (err) {
    next(err);
  }

})

module.exports = router;
