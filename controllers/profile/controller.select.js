const { responseSuccess, responseError } = require("../../libs/response");
const { usersModel } = require("../../models");

exports.selectById = async (req, res) => {
	const { id } = req.decoded;
	try {
		const results = await usersModel.select.selectByIdModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
