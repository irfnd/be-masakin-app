const status = require("http-status");
const { responseSuccess } = require("../libs/response");
const { Videos } = require("../models");

// * Admin Privilages
const createOne = async (req, res, next) => {
	try {
		const results = await Videos.create(req.body);
		res.json(responseSuccess("created", results));
	} catch (err) {
		next(err);
	}
};

const findAll = async (req, res, next) => {
	try {
		const results = await Videos.findAll();
		res.json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

const findAllByRecipe = async (req, res, next) => {
	const { id: recipeId } = req.params;
	try {
		if (!Number(recipeId)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Videos.findAll({ where: { recipeId } });
		res.json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

const findOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Videos.findByPk(id);
		if (!results) throw new Error("Video not found!", { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

const updateOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Videos.update(req.body, { where: { id }, returning: true });
		if (results[0] < 1) throw new Error(`Videos with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("updated", results[1][0]));
	} catch (err) {
		next(err);
	}
};

const deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Videos.destroy({ where: { id } });
		if (results < 1) throw new Error(`Videos with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", id));
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createOne,
	findAll,
	findAllByRecipe,
	findOne,
	updateOne,
	deleteOne,
};
