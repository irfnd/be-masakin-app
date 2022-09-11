const status = require("http-status");
const { Users, Recipes, LikedRecipes, SavedRecipes, redis } = require("../models");
const { responseSuccess } = require("../libs/response");

const check = async (req, res, next) => {
	const { id: userId } = req.decoded;
	const { id: recipeId } = req.params;
	const uniqueName = `${userId}-${recipeId}`;
	let results;
	try {
		if (!Number(recipeId)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const checkUser = await Users.findByPk(userId);
		if (!checkUser) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		const checkRecipe = await Recipes.findByPk(recipeId);
		if (!checkRecipe) throw new Error("Recipe not found!", { cause: { code: status.NOT_FOUND } });
		const checkLiked = await Users.findByPk(userId, {
			attributes: [],
			include: { model: Recipes, through: { model: LikedRecipes, attributes: [] }, where: { id: recipeId } },
		});
		const checkSaved = await Users.findByPk(userId, {
			attributes: [],
			include: { model: Recipes, through: { model: SavedRecipes, attributes: [] }, where: { id: recipeId } },
		});

		results = { liked: checkLiked?.recipes?.length > 0 || false, saved: checkSaved?.recipes?.length > 0 || false };
		await redis.set(`checkRecipe-${uniqueName}`, JSON.stringify(results), { EX: 3, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

module.exports = {
	check,
};
