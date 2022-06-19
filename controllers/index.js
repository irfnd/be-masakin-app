module.exports = {
	usersController: {
		insert: require("./users/controller.insert"),
		select: require("./users/controller.select"),
		update: require("./users/controller.update"),
		delete: require("./users/controller.delete"),
	},
	recipesController: {
		insert: require("./recipes/controller.insert"),
		select: require("./recipes/controller.select"),
		update: require("./recipes/controller.update"),
		delete: require("./recipes/controller.delete"),
	},
};
