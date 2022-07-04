const { responseSuccess } = require("../../libs/response");
const { usersModel } = require("../../models");

exports.selectAll = async (req, res, next) => {
	try {
		const results = await usersModel.select.selectAllModel();
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await usersModel.select.selectByIdModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};
