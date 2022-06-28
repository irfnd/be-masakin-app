const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { recipesVideosModel } = require("../../models");
const { uploadVideosRecipe } = require("../../middlewares/multer");

const upload = uploadVideosRecipe.single("recipe_video");

exports.insertOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			} else {
				const data = {
					...req.body,
					recipe_video: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
				};
				const results = await recipesVideosModel.insert.insertOneModel(data);
				res.status(200).json(responseSuccess("Successfully added data.", results));
			}
		} catch (err) {
			const error = JSON.parse(err.message);
			res.status(error.code).json(responseError(error.message));
		}
	});
};
