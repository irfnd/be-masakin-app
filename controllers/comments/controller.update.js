const { responseSuccess } = require("../../libs/response");
const { commentsModel } = require("../../models");

exports.updateOne = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await commentsModel.update.updateOneModel(req.body, id);
		res.status(200).json(responseSuccess("updated", results));
	} catch (err) {
		next(err);
	}
};
