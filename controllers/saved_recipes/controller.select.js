const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { savedRecipesModel } = require("../../models");

exports.selectByUser = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await savedRecipesModel.select.selectByUserModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};

exports.selectByRecipe = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await savedRecipesModel.select.selectByRecipeModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
