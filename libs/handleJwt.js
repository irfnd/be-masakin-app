require("dotenv").config();
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

const jwt = require("jsonwebtoken");

exports.checkToken = (token) => {
	try {
		const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN);
		return decoded;
	} catch (err) {
		return Error(JSON.stringify({ code: 401, message: "Invalid token!" }));
	}
};

exports.generateAccessToken = (data) => {
	return jwt.sign(data, SECRET_ACCESS_TOKEN, { expiresIn: "30s" });
};

exports.generateRefreshToken = (data) => {
	return jwt.sign(data, SECRET_REFRESH_TOKEN, { expiresIn: "2m" });
};
