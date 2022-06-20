const response = require("../../libs/responseFormat/response");
const { commentsModel } = require("../../models");

exports.selectAll = async (req, res) => {
	try {
		const results = await commentsModel.select.selectAllModel();
		res
			.status(200)
			.json(response(true, "Successfully retrieved data.", results));
	} catch (err) {
		res
			.status(400)
			.json(response(false, "Something wrong!", null, err.message));
	}
};

exports.selectById = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await commentsModel.select.selectByIdModel(id);
			if (results.length === 0) throw new Error("Data not found!");
			res
				.status(200)
				.json(response(true, "Successfully retrieved data.", results));
		} else {
			throw new Error("Parameter must be a number!");
		}
	} catch (err) {
		res
			.status(400)
			.json(response(false, "Something wrong!", null, err.message));
	}
};

exports.selectByRecipe = async (req, res) => {
	const { id } = req.params;
	try {
		if (Number(id)) {
			const results = await commentsModel.select.selectByRecipeModel(id);
			if (results.length === 0) throw new Error("Data not found!");
			res
				.status(200)
				.json(response(true, "Successfully retrieved data.", results));
		} else {
			throw new Error("Parameter must be a number!");
		}
	} catch (err) {
		res
			.status(400)
			.json(response(false, "Something wrong!", null, err.message));
	}
};
