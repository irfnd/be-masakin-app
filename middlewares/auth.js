const { compareSync } = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../libs/generateToken");
const { responseError } = require("../libs/response");
const { usersModel } = require("../models");

exports.userLogin = async (req, res, next) => {
	try {
		const user = await usersModel.select.selectByEmailModel(req.body.email);
		if (user.length > 0) {
			const validPassword = compareSync(req.body.password, user[0].password);
			if (validPassword) {
				const payload = { email: user[0].email, name: user[0].name, role: user[0].role };
				const accessToken = generateAccessToken(payload);
				const refreshToken = generateRefreshToken(payload);
				req.body = { ...req.body, ...payload };
				req.token = { access_token: accessToken, refresh_token: refreshToken };
				return next();
			}
			throw new Error(JSON.stringify({ code: 400, message: "Invalid password!" }));
		}
		throw new Error(JSON.stringify({ code: 404, message: "User not found!" }));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
