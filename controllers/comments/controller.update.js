const { responseSuccess } = require("../../libs/response");
const { commentsModel } = require("../../models");

exports.updateOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await commentsModel.update.updateOneModel(req.body, id);
			res.status(200).json(responseSuccess("updated", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		next(err);
	}
};
