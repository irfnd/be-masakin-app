const { responseError } = require("../libs/responseFormat/response");

module.exports = (app) => {
	app.use("/users", require("./route.users"));
	app.use("/recipes", require("./route.recipes"));
	app.use("/comments", require("./route.comments"));
	app.use("/liked-recipes", require("./route.liked_recipes"));
	app.use("/saved-recipes", require("./route.saved_recipes"));
	app.use("/recipes-videos", require("./route.recipes_videos"));

	app.use("*", (req, res) => res.status(404).json(responseError("Page route not found!")));
};
