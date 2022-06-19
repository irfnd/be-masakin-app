const cryptojs = require("crypto-js");
const secret = "resipsecret123";

exports.encryptPassword = (password) => {
	return cryptojs.AES.encrypt(password, secret).toString();
};

exports.comparePassword = (hashPassword, plainPassword) => {
	let decryptPass = cryptojs.AES.decrypt(hashPassword, secret).toString(
		cryptojs.enc.Utf8
	);
	if (plainPassword === decryptPass) {
		return true;
	} else {
		return false;
	}
};
