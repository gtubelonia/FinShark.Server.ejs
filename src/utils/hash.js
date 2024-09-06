var argon2 = require('argon2');

const argonHash = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        throw Error("Error Occured hashing password");
    }
}

const argonVerify = async (hash, password) => {
    try {
        return await argon2.verify(hash, password)
    } catch (err) {
        throw Error("Error Occured hashing password");
    }
}
module.exports = { argonHash, argonVerify }