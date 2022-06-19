const response = require("../../libs/responseFormat/response");
const usersModel = require("../../models/users");

exports.deleteOne = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await usersModel.delete.deleteOneModel(id);
			res
				.status(200)
				.json(response(true, "Successfully deleted data.", results));
		} else {
			throw new Error("Parameter must be a number!");
		}
	} catch (err) {
		res
			.status(400)
			.json(response(false, "Something wrong!", null, err.message));
	}
};
