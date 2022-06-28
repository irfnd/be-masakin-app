const cryptojs = require("crypto-js");
const secret = process.env.HASHING_SECRET;

exports.encryptPassword = (password) => {
	return cryptojs.AES.encrypt(password, secret).toString();
};

exports.comparePassword = (hashPassword, plainPassword) => {
	const decryptPass = cryptojs.AES.decrypt(hashPassword, secret).toString(cryptojs.enc.Utf8);
	if (plainPassword === decryptPass) {
		return true;
	}
	return false;
};
