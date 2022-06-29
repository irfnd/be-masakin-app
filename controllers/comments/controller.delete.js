const { responseSuccess, responseError } = require("../../libs/response");
const { commentsModel } = require("../../models");

exports.deleteOne = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await commentsModel.delete.deleteOneModel(id);
			res.status(200).json(responseSuccess("deleted", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
