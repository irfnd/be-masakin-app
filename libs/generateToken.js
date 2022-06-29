require("dotenv").config();
const { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } = process.env;

const jwt = require("jsonwebtoken");

exports.generateAccessToken = (data) => {
	return jwt.sign(data, SECRET_ACCESS_TOKEN, { expiresIn: "2m" });
};

exports.generateRefreshToken = (data) => {
	return jwt.sign(data, SECRET_REFRESH_TOKEN, { expiresIn: "30m" });
};
