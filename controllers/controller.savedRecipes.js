const status = require("http-status");
const { responseSuccess } = require("../libs/response");
const { Users, Recipes, Comments, Videos, SavedRecipes, redis } = require("../models");
const { queryLiked, querySaved } = require("../models/helpers/subQuery");

// * Admin Privilages
const createOne = async (req, res, next) => {
	try {
		const results = await SavedRecipes.create(req.body);
		res.json(responseSuccess("added", results));
	} catch (err) {
		next(err);
	}
};

const findAll = async (req, res, next) => {
	const { by, id } = req.query;
	const uniqueName = Object.values(req.query).join("-");
	let results;
	try {
		if (by === "user") {
			if (!id) throw new Error("Query id required!", { cause: { code: status.BAD_REQUEST } });
			if (!Number(id)) throw new Error("Query id must be a number!", { cause: { code: status.BAD_REQUEST } });
			results = await SavedRecipes.findAll({ where: { userId: id } });
			await redis.set(`savedRecipeAll-${uniqueName}`, JSON.stringify(results), { EX: 3, NX: true });
			res.json(responseSuccess("retrieved", { fromCache: false, results }));
		} else if (by === "recipe") {
			if (!id) throw new Error("Query id required!", { cause: { code: status.BAD_REQUEST } });
			if (!Number(id)) throw new Error("Query id must be a number!", { cause: { code: status.BAD_REQUEST } });
			results = await SavedRecipes.findAll({ where: { recipeId: id } });
			await redis.set(`likedRecipeAll-${uniqueName}`, JSON.stringify(results), { EX: 3, NX: true });
			res.json(responseSuccess("retrieved", { fromCache: false, results }));
		} else {
			results = await SavedRecipes.findAll();
			await redis.set(`likedRecipeAll-${uniqueName}`, JSON.stringify(results), { EX: 3, NX: true });
			res.json(responseSuccess("retrieved", { fromCache: false, results }));
		}
	} catch (err) {
		next(err);
	}
};

const deleteOne = async (req, res, next) => {
	const { userId, recipeId } = req.body;
	try {
		const results = await SavedRecipes.destroy({ where: { userId, recipeId } });
		if (results < 1) throw new Error(`Liked recipe not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", { userId, recipeId }));
	} catch (err) {
		next(err);
	}
};

// * User Privilages
const createFromUser = async (req, res, next) => {
	const { id: userId } = req.decoded;
	const { id: recipeId } = req.params;
	try {
		const checkUser = await Users.findByPk(userId);
		if (!checkUser) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		const checkRecipe = await Recipes.findByPk(recipeId);
		if (!checkRecipe) throw new Error("Recipe not found!", { cause: { code: status.NOT_FOUND } });
		const results = await SavedRecipes.create({ userId, recipeId: checkRecipe.id });
		res.json(responseSuccess("created", results));
	} catch (err) {
		next(err);
	}
};

const findAllFromUser = async (req, res, next) => {
	const { id } = req.decoded;
	let results;
	try {
		const checkUser = await Users.findByPk(id);
		if (!checkUser) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		results = await Users.findByPk(id, {
			attributes: [],
			include: {
				model: Recipes,
				attributes: { include: [queryLiked, querySaved] },
				through: { model: SavedRecipes, attributes: [] },
				include: [
					{ model: Users, attributes: ["id", "name", "photo"] },
					{ model: Comments, include: [{ model: Users, attributes: ["id", "name", "photo"] }] },
					Videos,
				],
			},
		});
		await redis.set(`savedRecipeAll-${id}`, JSON.stringify(results.recipes), { EX: 3, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results.recipes }));
	} catch (err) {
		next(err);
	}
};

const deleteFromUser = async (req, res, next) => {
	const { id: userId } = req.decoded;
	const { id: recipeId } = req.params;
	try {
		if (!Number(recipeId)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await SavedRecipes.destroy({ where: { userId, recipeId } });
		if (results < 1) throw new Error(`Recipe with id ${recipeId} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", recipeId));
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createOne,
	findAll,
	deleteOne,
	createFromUser,
	findAllFromUser,
	deleteFromUser,
};
