const { responseSuccess, responseError } = require("../../libs/response");
const { savedRecipesModel } = require("../../models");

exports.deleteOne = async (req, res) => {
	try {
		const results = await savedRecipesModel.delete.deleteOneModel(req.body);
		res.status(200).json(responseSuccess("deleted", results));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
