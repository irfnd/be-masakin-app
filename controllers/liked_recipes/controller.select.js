const { responseSuccess } = require("../../libs/response");
const { likedRecipesModel } = require("../../models");

exports.selectByUser = async (req, res, next) => {
	const { id } = req.decoded;
	try {
		const results = await likedRecipesModel.select.selectByUserModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectByRecipe = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await likedRecipesModel.select.selectByRecipeModel(id);
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};
