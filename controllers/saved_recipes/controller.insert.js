const { responseSuccess } = require("../../libs/response");
const { savedRecipesModel } = require("../../models");

exports.insertOne = async (req, res, next) => {
	try {
		const results = await savedRecipesModel.insert.insertOneModel(req.body);
		res.status(200).json(responseSuccess("added", results));
	} catch (err) {
		next(err);
	}
};
