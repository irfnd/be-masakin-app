require("dotenv").config();
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN, EXPIRES_ACCESS_TOKEN, EXPIRES_REFRESH_TOKEN } = process.env;

const jwt = require("jsonwebtoken");
const status = require("http-status");

const generateAccessToken = (payload) => {
	return jwt.sign(payload, SECRET_ACCESS_TOKEN, { expiresIn: EXPIRES_ACCESS_TOKEN });
};

const generateRefreshToken = (payload) => {
	return jwt.sign(payload, SECRET_REFRESH_TOKEN, { expiresIn: EXPIRES_REFRESH_TOKEN });
};

const checkAccessToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN);
			resolve(decoded);
		} catch (err) {
			reject(new Error("Invalid or expired token!", { cause: { code: status.UNAUTHORIZED } }));
		}
	});
};

const checkRefreshToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(token, SECRET_REFRESH_TOKEN);
			resolve(decoded);
		} catch (err) {
			reject(new Error("Invalid or expired token!", { cause: { code: status.UNAUTHORIZED } }));
		}
	});
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	checkAccessToken,
	checkRefreshToken,
};
