const status = require("http-status");
const { Op } = require("sequelize");
const { Users, Recipes, Comments, Videos, sequelize, redis } = require("../models");
const { queryLiked, querySaved } = require("../models/helpers/subQuery");
const { responseSuccess } = require("../libs/response");
const { getPagination, getPagingData, getSortOrder } = require("../libs/searchPagination");

// * Admin Privilages
const createOne = async (req, res, next) => {
	try {
		const newRecipe = { ...req.body, ingredients: req.body.ingredients.split("\n"), steps: req.body.steps.split("\n") };
		const results = await Recipes.create(newRecipe);
		res.json(responseSuccess("added", results));
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const findAll = async (req, res, next) => {
	let results;
	try {
		results = await Recipes.findAll({
			attributes: { include: [queryLiked, querySaved] },
			include: [
				{ model: Users, attributes: ["id", "name", "photo"] },
				{ model: Comments, include: [{ model: Users, attributes: ["id", "name", "photo"] }] },
				Videos,
			],
		});
		await redis.set("recipeAll", JSON.stringify(results), { EX: 30, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

const findAllPopular = async (req, res, next) => {
	let results;
	try {
		results = await Recipes.findAll({
			attributes: { include: [queryLiked, querySaved] },
			include: [
				{ model: Users, attributes: ["id", "name", "photo"] },
				{ model: Comments, include: [{ model: Users, attributes: ["id", "name", "photo"] }] },
				Videos,
			],
			order: [
				[sequelize.literal('"likedCount"'), "desc"],
				[sequelize.literal('"savedCount"'), "desc"],
			],
		});
		await redis.set("recipeAllPopular", JSON.stringify(results), { EX: 30, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

const findAllPagination = async (req, res, next) => {
	const { page, size, search, sort, order } = req.query;
	const { limit, offset } = getPagination(page, size);
	const handleSort = getSortOrder(sort, order || "ASC");
	const uniqueName = Object.values(req.query).join("-");
	let results;
	try {
		const getRecipes = await Recipes.findAndCountAll({
			attributes: { include: [queryLiked, querySaved] },
			include: [
				{ model: Users, attributes: ["id", "name", "photo"] },
				{ model: Comments, include: [{ model: Users, attributes: ["id", "name", "photo"] }] },
			],
			where: search ? { name: { [Op.iLike]: `%${search}%` } } : null,
			limit,
			offset,
			order: handleSort,
		});
		results = getPagingData(getRecipes, page, limit);
		await redis.set(`recipeAllPagination-${uniqueName}`, JSON.stringify(results), { EX: 30, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

const findOne = async (req, res, next) => {
	const { id } = req.params;
	let results;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		results = await Recipes.findByPk(id, {
			attributes: { include: [queryLiked, querySaved] },
			include: [
				{ model: Users, attributes: ["id", "name", "photo"] },
				{ model: Comments, include: [{ model: Users, attributes: ["id", "name", "photo"] }] },
				Videos,
			],
		});
		if (!results) throw new Error("Recipe not found!", { cause: { code: status.NOT_FOUND } });
		await redis.set(`recipe-${id}`, JSON.stringify(results), { EX: 30, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

const updateOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Recipes.update(req.body, { where: { id }, returning: true });
		if (results[0] < 1) throw new Error(`Recipe with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("updated", results[1][0]));
	} catch (err) {
		next(err);
	}
};

const deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Recipes.destroy({ where: { id } });
		if (results < 1) throw new Error(`Recipe with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", id));
	} catch (err) {
		next(err);
	}
};

// * User Privilages
const createFromUser = async (req, res, next) => {
	const { id: userId } = req.decoded;
	try {
		const newRecipe = {
			...req.body,
			ingredients: req.body.ingredients.split("\n"),
			steps: req.body.steps.split("\n"),
			photo: req?.file?.publicUrl || null,
			photoName: req?.file?.fileRef?.metadata?.name || null,
			userId,
		};
		const results = await Recipes.create(newRecipe);
		const newVideo = req.body.videos !== "" ? JSON.parse(req.body.videos).map((el) => ({ ...el, recipeId: results.id })) : null;
		const videos = newVideo.length > 0 ? await Videos.bulkCreate(newVideo) : null;
		res.json(responseSuccess("added", { ...Object.asign({}, results), videos }));
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const findAllMyRecipes = async (req, res, next) => {
	const { id: userId } = req.decoded;
	let results;
	try {
		results = await Recipes.findAll({
			attributes: { include: [queryLiked, querySaved] },
			include: [
				{ model: Users, attributes: ["id", "name", "photo"] },
				{ model: Comments, include: [{ model: Users, attributes: ["id", "name", "photo"] }] },
				Videos,
			],
			where: { userId },
		});
		await redis.set(`recipeMine-${userId}`, JSON.stringify(results), { EX: 30, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

const findAllMyRecipesPagination = async (req, res, next) => {
	const { id: userId } = req.decoded;
	const { page, size, search, sort, order } = req.query;
	const { limit, offset } = getPagination(page, size);
	const handleSort = getSortOrder(sort, order || "ASC");
	const uniqueName = Object.values(req.query).join("-").concat(userId);
	console.log(uniqueName);
	let results;
	try {
		const getRecipes = await Recipes.findAndCountAll({
			attributes: { include: [queryLiked, querySaved] },
			where: search ? { name: { [Op.iLike]: `%${search}%`, userId } } : { userId },
			limit,
			offset,
			order: handleSort,
		});
		results = getPagingData(getRecipes, page, limit);
		await redis.set(`myRecipePagination-${uniqueName}`, JSON.stringify(results), { EX: 30, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

const updateFromUser = async (req, res, next) => {
	const { id: userId } = req.decoded;
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const checkRecipe = await Recipes.findByPk(id);
		if (!checkRecipe) throw new Error(`Recipe with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		const newRecipe = {
			...req.body,
			ingredients: req.body.ingredients.split("\n"),
			steps: req.body.steps.split("\n"),
			photo: req?.file?.publicUrl || checkRecipe.photo,
			photoName: req?.file?.fileRef?.metadata?.name || checkRecipe.photoName,
			userId,
		};
		const results = await Recipes.update(newRecipe, { where: { id }, returning: true });
		if (results[0] < 1) throw new Error(`Recipe with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("updated", results[1][0]));
	} catch (err) {
		next(err);
	}
};

const deleteFromUser = async (req, res, next) => {
	const { id: userId } = req.decoded;
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Recipes.destroy({ where: { id, userId } });
		if (results < 1) throw new Error(`Recipe with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", id));
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createOne,
	findAll,
	findAllPopular,
	findAllPagination,
	findOne,
	updateOne,
	deleteOne,
	findAllMyRecipes,
	findAllMyRecipesPagination,
	createFromUser,
	updateFromUser,
	deleteFromUser,
};
