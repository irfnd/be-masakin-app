module.exports = (sequelize, Sequelize) => {
	return sequelize.define("comments", {
		comment: { type: Sequelize.TEXT, allowNull: false },
	});
};
