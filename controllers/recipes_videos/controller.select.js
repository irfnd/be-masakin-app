const { responseSuccess } = require("../../libs/response");
const { recipesVideosModel } = require("../../models");

exports.selectById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await recipesVideosModel.select.selectByIdModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectByRecipe = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await recipesVideosModel.select.selectByRecipeModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};
