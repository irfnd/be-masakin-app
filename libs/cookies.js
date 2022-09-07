const env = require("../libs/env");
const parse = require("parse-duration");

const cookiesOptions = {
	path: "/",
	maxAge: parse(env.expiresAccessToken),
	// domain: env.modeEnv === "production" ? "masakin-app.vercel.app" : "localhost",
	// httpOnly: true,
};

module.exports = {
	cookiesOptions,
};
