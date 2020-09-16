const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const constant = require("../helpers/constant");



module.exports.jwtEncode = (payload) => {
    try {
        return jwt.sign(payload, constant.config.utils.JWT_SECRET, { expiresIn: constant.config.utils.JWT_TOKEN_EXPIRE });
    } catch (exe) {
        return null;
    }
}

module.exports.jwtDecode = (token) => {
    try {
        return jwt.decode(token);
    } catch (exe) {
        return null;
    }
}

module.exports.jwtVerify = (token) => {
    try {
        return jwt.verify(token, constant.config.utils.JWT_SECRET);
    } catch (exe) {
        return null;
    }
}


module.exports.hash = (plainText) => {
    try {
        return md5(plainText);
    } catch (exe) {
        return null;
    }
}


module.exports.encrypt = (plainText) => {
    try {
        return cryptoJs.AES.encrypt(plainText, constant.config.utils.ENCRYPT_SALT).toString();
    } catch (exe) {
        return null;
    }
}

module.exports.decrypt = (cipherText) => {
    try {
        return cryptoJs.AES.decrypt(cipherText, constant.config.utils.ENCRYPT_SALT).toString(cryptoJs.enc.Utf8);
    } catch (exe) {
        return null;
    }
}
