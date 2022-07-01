const { responseSuccess } = require("../../libs/response");
const { recipesModel } = require("../../models");
const { deleteFile } = require("../../libs/deleteFile");

exports.deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await recipesModel.delete.deleteOneModel(id);
			if (results.request[0].photo_recipe !== null) {
				await deleteFile(results.request[0].photo_recipe);
			}
			res.status(200).json(responseSuccess("deleted", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};
