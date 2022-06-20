const response = require("../../libs/responseFormat/response");
const { commentsModel } = require("../../models");

exports.insertOne = async (req, res) => {
	try {
		const results = await commentsModel.insert.insertOneModel(req.body);
		res.status(200).json(response(true, "Successfully added data.", results));
	} catch (err) {
		res
			.status(400)
			.json(response(false, "Something wrong!", null, err.message));
	}
};
