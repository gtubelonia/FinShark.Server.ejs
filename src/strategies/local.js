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
        console.log(err);
        done(err, false);
    }
}

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        console.log(id);
        const foundUser = User.findById(id).exec();

        done(null, foundUser);
    } catch (err) {
        done(err);
    }
});