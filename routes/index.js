const { responseError } = require("../libs/response");

module.exports = (app) => {
	app.use("/auth", require("./route.auth"));

	app.use("/users", require("./route.users"));
	app.use("/recipes", require("./route.recipes"));
	app.use("/comments", require("./route.comments"));
	app.use("/liked-recipes", require("./route.likedRecipes"));
	app.use("/saved-recipes", require("./route.savedRecipes"));
	app.use("/recipes-videos", require("./route.recipesVideos"));

	app.use("*", (req, res) => res.status(404).json(responseError("Page route not found!")));
};
