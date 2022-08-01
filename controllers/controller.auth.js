const status = require("http-status");
const { hashSync, compareSync } = require("bcrypt");
const { Users, Tokens } = require("../models");
const { generateAccessToken, generateRefreshToken, checkRefreshToken } = require("../libs/handleJwt");
const { responseSuccess } = require("../libs/response");

const register = async (req, res, next) => {
	const { password } = req.body;
	try {
		const newUser = { ...req.body, password: hashSync(password, 10) };
		const results = await Users.create(newUser);
		res.json(responseSuccess("created", results));
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const getUser = await Users.findOne({ where: { email } });
		if (!getUser) throw new Error("Invalid email!", { cause: { code: status.UNAUTHORIZED } });
		const checkPassword = compareSync(password, getUser.password);
		if (!checkPassword) throw new Error("Invalid password!", { cause: { code: status.UNAUTHORIZED } });
		const payload = { id: getUser.id, name: getUser.name, email: getUser.email, role: getUser.role };
		const accessToken = generateAccessToken(payload);
		const refreshToken = generateRefreshToken(payload);
		await Tokens.create({ token: refreshToken, userId: getUser.id });
		res.json(responseSuccess("retrieved", { ...payload, accessToken, refreshToken }));
	} catch (err) {
		next(err);
	}
};

const refresh = async (req, res, next) => {
	const { refreshToken } = req.body;
	try {
		if (!refreshToken) throw new Error("Refresh token required!", { cause: { code: status.UNAUTHORIZED } });
		const checkToken = await Tokens.findOne({ where: { token: refreshToken } });
		if (!checkToken) throw new Error("Invalid token!", { cause: { code: status.UNAUTHORIZED } });
		const decoded = await checkRefreshToken(refreshToken);
		const payload = { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
		const newAccessToken = generateAccessToken(payload);
		const newRefreshToken = generateRefreshToken(payload);
		await Tokens.update({ token: newRefreshToken }, { where: { token: refreshToken } });
		res.json(responseSuccess("retrieved", { ...payload, accessToken: newAccessToken, refreshToken: newRefreshToken }));
	} catch (err) {
		next(err);
	}
};

module.exports = {
	register,
	login,
	refresh,
};
