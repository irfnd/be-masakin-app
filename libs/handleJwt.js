require("dotenv").config();
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN, EXPIRES_ACCESS_TOKEN, EXPIRES_REFRESH_TOKEN } =
	process.env;

const jwt = require("jsonwebtoken");

exports.generateAccessToken = (data) => {
	return jwt.sign(data, SECRET_ACCESS_TOKEN, { expiresIn: EXPIRES_ACCESS_TOKEN });
};

exports.generateRefreshToken = (data) => {
	return jwt.sign(data, SECRET_REFRESH_TOKEN, { expiresIn: EXPIRES_REFRESH_TOKEN });
};

exports.checkToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN);
			resolve(decoded);
		} catch (err) {
			reject(new Error(JSON.stringify({ code: 401, message: "Invalid or expired token!" })));
		}
	});
};

exports.checkRefreshToken = (token) => {
	return new Promise((resolve, reject) => {
		try {
			const decoded = jwt.verify(token, SECRET_REFRESH_TOKEN);
			resolve(decoded);
		} catch (err) {
			reject(new Error(JSON.stringify({ code: 401, message: "Invalid or expired token!" })));
		}
	});
};
