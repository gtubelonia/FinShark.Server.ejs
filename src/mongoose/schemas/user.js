var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,

    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
},
{versionKey: '__v'})

const User = mongoose.model("User", UserSchema);

module.exports = User;