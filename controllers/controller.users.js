const status = require("http-status");
const { hashSync } = require("bcrypt");
const { responseSuccess } = require("../libs/response");
const { Users, redis } = require("../models");

// * Admin Privilages
const createOne = async (req, res, next) => {
	try {
		const newUser = { ...req.body, password: hashSync(req.body.password, 10) };
		const results = await Users.create(newUser);
		res.json(responseSuccess("added", results));
	} catch (err) {
		next(err);
	}
};

const findAll = async (req, res, next) => {
	try {
		const results = await Users.findAll();
		res.json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

const findOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Users.findByPk(id);
		if (!results) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

const updateOne = async (req, res, next) => {
	const { id } = req.params;
	const { password } = req.body;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const updateUser = password ? { ...req.body, password: hashSync(req.body.password, 10) } : req.body;
		const results = await Users.update(updateUser, { where: { id }, returning: true });
		if (results[0] < 1) throw new Error(`User with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("updated", results[1][0]));
	} catch (err) {
		next(err);
	}
};

const deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Users.destroy({ where: { id } });
		if (results < 1) throw new Error(`User with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", id));
	} catch (err) {
		next(err);
	}
};

// * User Privilages
const findFromUser = async (req, res, next) => {
	const { id } = req.decoded;
	let results;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		results = await Users.findByPk(id);
		if (!results) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		await redis.set(`profile-${id}`, JSON.stringify(results), { EX: 30, NX: true });
		res.json(responseSuccess("retrieved", { fromCache: false, data: results }));
	} catch (err) {
		next(err);
	}
};

const updateFromUser = async (req, res, next) => {
	const { id } = req.decoded;
	const { password } = req.body;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const updateUser = password ? { ...req.body, password: hashSync(req.body.password, 10) } : req.body;
		const results = await Users.update(updateUser, { where: { id }, returning: true });
		if (results[0] < 1) throw new Error(`User with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("updated", results[1][0]));
	} catch (err) {
		next(err);
	}
};

const deleteFromUser = async (req, res, next) => {
	const { id } = req.decoded;
	try {
		if (!Number(id)) throw new Error("Parameter id must be a number!", { cause: { code: status.BAD_REQUEST } });
		const results = await Users.destroy({ where: { id } });
		if (results < 1) throw new Error(`User with id ${id} not found!`, { cause: { code: status.NOT_FOUND } });
		res.json(responseSuccess("deleted", id));
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
	findFromUser,
	updateFromUser,
	deleteFromUser,
};
