const status = require("http-status");
const { checkAccessToken } = require("../libs/handleJwt");

const isLogin = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	try {
		if (!token) throw new Error("Access token required!", { cause: { code: status.UNAUTHORIZED } });
		const decoded = await checkAccessToken(token);
		req.decoded = { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	isLogin,
};
