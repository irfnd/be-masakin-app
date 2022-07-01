const { responseSuccess } = require("../../libs/response");
const { commentsModel } = require("../../models");

exports.selectAll = async (req, res, next) => {
	try {
		const results = await commentsModel.select.selectAllModel();
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await commentsModel.select.selectByIdModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};

exports.selectByRecipe = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await commentsModel.select.selectByRecipeModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};
