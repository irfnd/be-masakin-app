const { responseSuccess } = require("../../libs/response");
const { usersModel } = require("../../models");

exports.selectById = async (req, res, next) => {
	const { id } = req.decoded;
	try {
		const results = await usersModel.select.selectByIdModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};
