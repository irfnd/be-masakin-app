const { responseSuccess } = require("../../libs/response");
const { recipesVideosModel } = require("../../models");
const { deleteFile } = require("../../libs/deleteFile");

exports.deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await recipesVideosModel.delete.deleteOneModel(id);
		if (results.request[0].recipe_video !== null) {
			await deleteFile(results.request[0].recipe_video);
		}
		res.status(200).json(responseSuccess("deleted", results));
	} catch (err) {
		next(err);
	}
};
