const env = require("../libs/env");

const jwt = require("jsonwebtoken");
const status = require("http-status");

const generateAccessToken = (payload) => {
	return jwt.sign(payload, env.secretAccessToken, { expiresIn: env.expiresAccessToken });
};

const generateRefreshToken = (payload) => {
	return jwt.sign(payload, env.secretRefreshToken, { expiresIn: env.expiresRefreshToken });
};

const generateVerifyToken = (payload) => {
	return jwt.sign(payload, env.secretAccessToken, { expiresIn: env.expiresVerifyToken });
};

const checkAccessToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(token, env.secretAccessToken);
			resolve(decoded);
		} catch (err) {
			reject(new Error("Invalid or expired token!", { cause: { code: status.UNAUTHORIZED } }));
		}
	});
};

const checkRefreshToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(token, env.secretRefreshToken);
			resolve(decoded);
		} catch (err) {
			reject(new Error("Invalid or expired token!", { cause: { code: status.UNAUTHORIZED } }));
		}
	});
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	generateVerifyToken,
	checkAccessToken,
	checkRefreshToken,
};
