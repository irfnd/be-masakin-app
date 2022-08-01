const { responseError } = require("../libs/response");

module.exports = (app) => {
	// Authentications routes
	app.use("/auth", require("./auth/route.auth"));

	// Superadmin special routes
	app.use("/admin", require("./admin"));

	// Users routes
	app.use("/profile", require("./user/route.profile"));
	app.use("/recipes", require("./user/route.recipes"));

	// Route not found
	app.use("*", (req, res) => res.status(404).json(responseError("Route not found!")));
};
