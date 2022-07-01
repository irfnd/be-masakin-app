const { responseSuccess, responseError } = require("../../libs/response");
const { usersModel } = require("../../models");

exports.selectAll = async (req, res) => {
	try {
		const results = await usersModel.select.selectAllModel();
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
			const results = await usersModel.select.selectByIdModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.selectByEmail = async (req, res) => {
	const { email } = req.params;
	try {
		if (String(email)) {
			const results = await usersModel.select.selectByEmailModel(email);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a string!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
