module.exports = (app) => {
	app.use("/users", require("./route.users"));
	app.use("/recipes", require("./route.recipes"));
	app.use("/comments", require("./route.comments"));
};
