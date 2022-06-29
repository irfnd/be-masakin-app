const { responseSuccess, responseError } = require("../../libs/response");
const { recipesModel } = require("../../models");

exports.selectAll = async (req, res) => {
	const { page, size } = req.query;
	try {
		const results = await recipesModel.select.selectAllModel(page, size);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.selectById = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await recipesModel.select.selectByIdModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.selectByOwner = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await recipesModel.select.selectByOwnerModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.selectByName = async (req, res) => {
	const { search } = req.body;
	try {
		const results = await recipesModel.select.selectByNameModel(search);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.selectLatest = async (req, res) => {
	try {
		const results = await recipesModel.select.selectLatestModel();
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
