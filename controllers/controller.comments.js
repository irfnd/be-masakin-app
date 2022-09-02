const status = require("http-status");
const { responseSuccess } = require("../libs/response");
const { Users, Comments } = require("../models");

// * Admin Privilages
const createOne = async (req, res, next) => {
	try {
		const results = await Comments.create(req.body);
		res.json(responseSuccess("added", results));
	} catch (err) {
		next(err);
	}
};

const findAll = async (req, res, next) => {
	try {
		const results = await Comments.findAll();
		res.json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

const findOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Comments.findByPk(id);
		if (!results) throw new Error("Comment not found!", { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

const updateOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Comments.update(req.body, { where: { id }, returning: true });
		if (results[0] < 1) throw new Error(`Comment with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("updated", results[1][0]));
	} catch (err) {
		next(err);
	}
};

const deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Comments.destroy({ where: { id } });
		if (results < 1) throw new Error(`Comment with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", id));
	} catch (err) {
		next(err);
	}
};

// * User Privilages
const createFromUser = async (req, res, next) => {
	const { id: userId } = req.decoded;
	try {
		const checkUser = await Users.findByPk(userId);
		if (!checkUser) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		const results = await Comments.create({ userId, recipeId: req.body.recipeId, comment: req.body.comment });
		res.json(responseSuccess("added", results));
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createOne,
	findAll,
	findOne,
	updateOne,
	deleteOne,
	createFromUser,
};
