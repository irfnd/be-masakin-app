const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { commentsModel } = require("../../models");

exports.insertOne = async (req, res) => {
	try {
		const results = await commentsModel.insert.insertOneModel(req.body);
		res.status(200).json(responseSuccess("Successfully added data.", results));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
