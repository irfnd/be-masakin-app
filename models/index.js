module.exports = {
	usersModel: {
		insert: require("./users/model.insert"),
		select: require("./users/model.select"),
		update: require("./users/model.update"),
		delete: require("./users/model.delete"),
	},
	recipesModel: {
		insert: require("./recipes/model.insert"),
		select: require("./recipes/model.select"),
		update: require("./recipes/model.update"),
		delete: require("./recipes/model.delete"),
	},
};
