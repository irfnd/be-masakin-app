require("dotenv").config();
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

const jwt = require("jsonwebtoken");

exports.generateAccessToken = (data) => {
	return jwt.sign(data, SECRET_ACCESS_TOKEN, { expiresIn: "1m" });
};

exports.generateRefreshToken = (data) => {
	return jwt.sign(data, SECRET_REFRESH_TOKEN, { expiresIn: "2m" });
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
