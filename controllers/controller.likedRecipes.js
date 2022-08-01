const status = require("http-status");
const { responseSuccess } = require("../libs/response");
const { Users, Recipes, LikedRecipes } = require("../models");
const { queryLiked, querySaved } = require("../models/helpers/subQuery");

// * Admin Privilages
const createOne = async (req, res, next) => {
	try {
		const results = await LikedRecipes.create(req.body);
		res.json(responseSuccess("added", results));
	} catch (err) {
		next(err);
	}
};

const findAll = async (req, res, next) => {
	const { by, id } = req.query;
	try {
		if (by === "user") {
			if (!id) throw new Error("Query id required!", { cause: { code: status.BAD_REQUEST } });
			if (!Number(id)) throw new Error("Query id must be a number!", { cause: { code: status.BAD_REQUEST } });
			const results = await LikedRecipes.findAll({ where: { userId: id } });
			res.json(responseSuccess("retrieved", results));
		} else if (by === "recipe") {
			if (!id) throw new Error("Query id required!", { cause: { code: status.BAD_REQUEST } });
			if (!Number(id)) throw new Error("Query id must be a number!", { cause: { code: status.BAD_REQUEST } });
			const results = await LikedRecipes.findAll({ where: { recipeId: id } });
			res.json(responseSuccess("retrieved", results));
		} else {
			const results = await LikedRecipes.findAll();
			res.json(responseSuccess("retrieved", results));
		}
	} catch (err) {
		next(err);
	}
};

const deleteOne = async (req, res, next) => {
	const { userId, recipeId } = req.body;
	try {
		const results = await LikedRecipes.destroy({ where: { userId, recipeId } });
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
		const results = await LikedRecipes.create({ userId, recipeId: checkRecipe.id });
		res.json(results);
	} catch (err) {
		next(err);
	}
};

const findAllFromUser = async (req, res, next) => {
	const { id } = req.decoded;
	try {
		const checkUser = await Users.findByPk(id);
		if (!checkUser) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		const results = await Users.findByPk(id, {
			attributes: [],
			include: {
				model: Recipes,
				attributes: { include: [queryLiked, querySaved] },
				through: { model: LikedRecipes, attributes: [] },
			},
		});
		res.json(responseSuccess("retrieved", results.recipes));
	} catch (err) {
		next(err);
	}
};

const deleteFromUser = async (req, res, next) => {
	const { id: userId } = req.decoded;
	const { id: recipeId } = req.params;
	try {
		if (!Number(recipeId)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await LikedRecipes.destroy({ where: { userId, recipeId } });
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
