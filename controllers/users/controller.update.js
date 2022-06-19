const response = require("../../libs/responseFormat/response");
const usersModel = require("../../models/users");

exports.updateOne = async (req, res) => {
	const { id } = req.params;
	try {
		const results = await usersModel.update.updateOneModel(req.body, id);
		res.status(200).json(response(true, "Successfully updated data.", results));
	} catch (err) {
		res
			.status(400)
			.json(response(false, "Something wrong!", null, err.message));
	}
};
