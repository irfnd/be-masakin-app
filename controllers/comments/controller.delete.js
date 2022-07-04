const { responseSuccess } = require("../../libs/response");
const { commentsModel } = require("../../models");

exports.deleteOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await commentsModel.delete.deleteOneModel(id);
		res.status(200).json(responseSuccess("deleted", results));
	} catch (err) {
		next(err);
	}
};
