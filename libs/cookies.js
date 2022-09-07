const env = require("../libs/env");
const parse = require("parse-duration");

const cookiesOptions = {
	path: "/",
	maxAge: parse(env.expiresAccessToken),
	sameSite: "none",
	secure: true,
	httpOnly: true,
	domain: env.modeEnv === "production" ? "masakin-app.vercel.app" : "localhost",
};

module.exports = {
	cookiesOptions,
};
