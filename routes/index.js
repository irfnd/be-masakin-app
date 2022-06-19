module.exports = (app) => {
	app.use("/users", require("./users.route"));
	app.use("/recipes", require("./recipes.route"));
};
