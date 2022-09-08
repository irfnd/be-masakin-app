const env = require("../libs/env");
const parse = require("parse-duration");

const cookiesOptions = {
	path: "/",
	maxAge: parse(env.expiresAccessToken),
	sameSite: env.modeEnv === "production" ? "none" : "lax",
	secure: env.modeEnv === "production",
	// domain: env.modeEnv === "production" ? "masakin-app.vercel.app" : "localhost",
	// httpOnly: true,
};

module.exports = {
	cookiesOptions,
};
