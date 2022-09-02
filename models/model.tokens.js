module.exports = (sequelize, Sequelize) => {
	return sequelize.define("tokens", {
		type: { type: Sequelize.ENUM("refresh", "reset", "verify"), defaultValue: "refresh" },
		token: { type: Sequelize.TEXT, allowNull: false },
	});
};
