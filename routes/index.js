const { responseError } = require("../libs/response");

module.exports = (app) => {
	// Authentications routes
	app.use("/auth", require("./route.auth"));

	// Superadmin special routes
	app.use("/users", require("./route.users"));
	app.use("/recipes", require("./route.recipes"));
	app.use("/comments", require("./route.comments"));
	app.use("/liked-recipes", require("./route.likedRecipes"));
	app.use("/saved-recipes", require("./route.savedRecipes"));
	app.use("/recipes-videos", require("./route.recipesVideos"));

	// Users routes
	app.use("/profile", require("./route.profile"));

	// Route not found
	app.use("*", (req, res) => res.status(404).json(responseError("Route not found!")));
};
