var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'User email required']
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    }
},
    { versionKey: '__v' })

UserSchema.plugin(uniqueValidator, { message: "Username must be unique" })
const User = mongoose.model("User", UserSchema);

module.exports = User;