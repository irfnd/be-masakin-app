const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { likedRecipesModel } = require("../../models");

exports.deleteOne = async (req, res) => {
	const { id } = req.params;
	try {
		const results = await likedRecipesModel.delete.deleteOneModel(id);
		res.status(200).json(responseSuccess("deleted", results));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
