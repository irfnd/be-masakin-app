const { responseSuccess } = require("../../libs/response");
const { likedRecipesModel } = require("../../models");

exports.deleteOne = async (req, res, next) => {
	try {
		const results = await likedRecipesModel.delete.deleteOneModel(req.body);
		res.status(200).json(responseSuccess("deleted", results));
	} catch (err) {
		next(err);
	}
};
