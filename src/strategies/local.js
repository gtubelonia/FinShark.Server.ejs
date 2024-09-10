const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require('../mongoose/schemas/user');
const { argonVerify } = require("../utils/hash");

//const customFields = {
//  usernameField: 'customUserName'
//  passwordField: 'customPasswordName'
//}

const verifyCallback = async (username, password, done) => {
    try {
        const foundUser = await User.findOne({ email: username }).exec();

        if (!foundUser) throw new Error("Invalid username or password")
        var verify = await argonVerify(foundUser.password, password);
        if (verify == false) throw new Error("Invalid username or password")

        done(null, foundUser);
    } catch (err) {
        done(err, false);
    }
}

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
    done(null, {
        id: user.id,
        username: user.username,
        email:user.email
    });
});

passport.deserializeUser(async (user, done) => {
    try {
        const foundUser = await User.findById(user.id).exec();

        done(null, foundUser);
    } catch (err) {
        done(err);
    }
});