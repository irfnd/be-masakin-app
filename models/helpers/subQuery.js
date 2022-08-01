const { sequelize } = require("../../models");

const queryLiked = [
	sequelize.literal(`(SELECT COUNT(*) FROM "liked_recipes" WHERE "liked_recipes"."recipeId" = "recipes"."id")`),
	"likedCount",
];

const querySaved = [
	sequelize.literal(`(SELECT COUNT(*) FROM "saved_recipes" WHERE "saved_recipes"."recipeId" = "recipes"."id")`),
	"savedCount",
];

module.exports = {
	queryLiked,
	querySaved,
};
