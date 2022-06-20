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
	commentsModel: {
		insert: require("./comments/model.insert"),
		select: require("./comments/model.select"),
		update: require("./comments/model.update"),
		delete: require("./comments/model.delete"),
	},
};
