const { responseError } = require("../libs/response");

module.exports = (app) => {
	// Authentications routes
	app.use("/auth", require("./auth/route.auth"));

	// Superadmin special routes
	app.use("/users", require("./admin/route.users"));
	app.use("/recipes", require("./admin/route.recipes"));
	app.use("/comments", require("./admin/route.comments"));
	app.use("/liked-recipes", require("./admin/route.likedRecipes"));
	app.use("/saved-recipes", require("./admin/route.savedRecipes"));
	app.use("/recipes-videos", require("./admin/route.recipesVideos"));

	// Users routes
	app.use("/profile", require("./user/route.profile"));
	app.use("/my-recipes", require("./user/route.myRecipes"));

	// Route not found
	app.use("*", (req, res) => res.status(404).json(responseError("Route not found!")));
};
