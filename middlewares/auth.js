const { compareSync } = require("bcrypt");
const { generateAccessToken, generateRefreshToken, checkToken, checkRefreshToken } = require("../libs/handleJwt");
const { responseError } = require("../libs/response");
const { tokensModel } = require("../models");
const { usersModel } = require("../models");

exports.userLogin = async (req, res, next) => {
	try {
		const user = await usersModel.select.selectByEmailModel(req.body.email);
		if (user.length > 0) {
			const validPassword = compareSync(req.body.password, user[0].password);
			if (validPassword) {
				const payload = {
					id: user[0].id,
					email: user[0].email,
					name: user[0].name,
					photo_profile: user[0].photo_profile,
					role: user[0].role,
				};
				const accessToken = generateAccessToken(payload);
				const refreshToken = generateRefreshToken(payload);
				req.decoded = {
					id: payload.id,
					name: payload.name,
					email: payload.email,
					photo_profile: payload.photo_profile,
					role: payload.role,
				};
				req.token = { access_token: accessToken, refresh_token: refreshToken };
				await tokensModel.insert.insertOneModel({
					id_user: payload.id,
					type: "refresh",
					refresh_token: refreshToken,
				});
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

exports.tokenRefresh = async (req, res, next) => {
	const { refresh_token } = req.body;
	try {
		if (!refresh_token) throw new Error(JSON.stringify({ code: 403, message: "Token required!" }));
		const dataToken = await tokensModel.select.selectByTokenModel(refresh_token);
		if (dataToken.length > 0) {
			const decoded = await checkRefreshToken(refresh_token);
			const payload = {
				id: decoded.id,
				email: decoded.email,
				name: decoded.name,
				photo_profile: decoded.photo_profile,
				role: decoded.role,
			};
			const accessToken = generateAccessToken(payload);
			const refreshToken = generateRefreshToken(payload);
			req.decoded = {
				id: payload.id,
				name: payload.name,
				email: payload.email,
				photo_profile: payload.photo_profile,
				role: payload.role,
			};
			req.token = { access_token: accessToken, refresh_token: refreshToken };
			await tokensModel.insert.insertOneModel({
				id_user: payload.id,
				type: "refresh",
				refresh_token: refreshToken,
			});
			return next();
		}
		throw new Error(JSON.stringify({ code: 401, message: "Invalid token!" }));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.verifyToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	try {
		if (!token) throw new Error(JSON.stringify({ code: 403, message: "Token required!" }));
		const decoded = await checkToken(token);
		req.decoded = { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
		next();
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.isAdmin = async (err, req, res, next) => {
	const { role } = req.decoded;
	try {
		if (err) throw err;
		if (role !== "admin") throw new Error(JSON.stringify({ code: 403, message: "Only Admin can access!" }));
		next();
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
