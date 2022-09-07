const CryptoJS = require("crypto-js");

const crypto = {
	encryptData: (data) => CryptoJS.AES.encrypt(JSON.stringify(data), "masakin-app").toString(),
	decryptData: (data) => JSON.parse(CryptoJS.AES.decrypt(data, "masakin-app").toString(CryptoJS.enc.Utf8)),
};

module.exports = {
	crypto,
};
