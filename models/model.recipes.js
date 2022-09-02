module.exports = (sequelize, Sequelize) => {
	return sequelize.define("recipes", {
		name: { type: Sequelize.TEXT, allowNull: false },
		shortDesc: { type: Sequelize.TEXT, defaultValue: null },
		ingredients: { type: Sequelize.ARRAY(Sequelize.TEXT) },
		steps: { type: Sequelize.ARRAY(Sequelize.TEXT) },
		photo: { type: Sequelize.TEXT, defaultValue: null },
		photoName: { type: Sequelize.TEXT, defaultValue: null },
	});
};
