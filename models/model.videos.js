module.exports = (sequelize, Sequelize) => {
	return sequelize.define("videos", {
		name: { type: Sequelize.TEXT, allowNull: false },
		shortDesc: { type: Sequelize.TEXT, defaultValue: null },
		video: { type: Sequelize.TEXT, defaultValue: null },
		videoName: { type: Sequelize.TEXT, defaultValue: null },
	});
};
