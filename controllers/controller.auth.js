const status = require("http-status");
const { hashSync, compareSync } = require("bcrypt");
const { Users, Tokens } = require("../models");
const {
	generateAccessToken,
	generateRefreshToken,
	generateVerifyToken,
	checkAccessToken,
	checkRefreshToken,
} = require("../libs/handleJwt");
const { responseSuccess } = require("../libs/response");
const { sendVerificationEmail } = require("../libs/emailServices");

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
		const payload = {
			id: getUser.id,
			name: getUser.name,
			email: getUser.email,
			role: getUser.role,
			isVerified: getUser.isVerified,
		};
		const accessToken = generateAccessToken(payload);
		const refreshToken = generateRefreshToken(payload);
		await Tokens.create({ token: refreshToken, userId: getUser.id });
		res.json(responseSuccess("retrieved", { ...payload, photo: getUser.photo, accessToken, refreshToken }));
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
		const payload = {
			id: decoded.id,
			name: decoded.name,
			email: decoded.email,
			role: decoded.role,
			isVerified: decoded.isVerified,
		};
		const newAccessToken = generateAccessToken(payload);
		const newRefreshToken = generateRefreshToken(payload);
		await Tokens.update({ token: newRefreshToken }, { where: { token: refreshToken } });
		res.json(responseSuccess("retrieved", { ...payload, accessToken: newAccessToken, refreshToken: newRefreshToken }));
	} catch (err) {
		next(err);
	}
};

const sendVerification = async (req, res, next) => {
	try {
		const verifyToken = generateVerifyToken(req.decoded);
		await Tokens.create({ token: verifyToken, type: "verify", userId: req.decoded.id });
		await sendVerificationEmail(req.decoded.email, verifyToken);
		res.json({
			success: true,
			message: "Email has been sent.",
			results: req.decoded.id,
		});
	} catch (err) {
		next(err);
	}
};

const verify = async (req, res, next) => {
	const { token } = req.query;
	try {
		const decoded = await checkAccessToken(token);
		const checkToken = await Tokens.findOne({ where: { token } });
		if (!checkToken) throw new Error("Invalid token!", { cause: { code: status.UNAUTHORIZED } });
		const user = await Users.findByPk(decoded.id);
		if (!user) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		await Tokens.destroy({ where: { token } });
		await Users.update({ isVerified: true }, { where: { id: decoded.id } });
		res.json({
			success: true,
			message: "User successfully verified",
			results: decoded.id,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	register,
	login,
	refresh,
	sendVerification,
	verify,
};
