module.exports = (sequelize, Sequelize) => {
	return sequelize.define("users", {
		name: { type: Sequelize.TEXT, allowNull: false },
		email: { type: Sequelize.TEXT, allowNull: false, unique: true },
		phoneNumber: { type: Sequelize.TEXT, allowNull: false, unique: true },
		password: { type: Sequelize.TEXT, allowNull: false },
		photo: { type: Sequelize.TEXT, defaultValue: null },
		photoName: { type: Sequelize.TEXT, defaultValue: null },
		role: { type: Sequelize.ENUM("user", "admin"), defaultValue: "user" },
		isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
	});
};
