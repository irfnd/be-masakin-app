const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { recipesVideosModel } = require("../../models");
const { uploadVideosRecipe } = require("../../middlewares/multer");

const upload = uploadVideosRecipe.single("recipe_video");

exports.updateOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			const { id } = req.params;
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			} else {
				const data = {
					...req.body,
					recipe_video: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
				};
				if (Number(id)) {
					const results = await recipesVideosModel.update.updateOneModel(data, id);
					res.status(200).json(responseSuccess("Successfully updated data.", results));
				} else {
					throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
				}
			}
		} catch (err) {
			const error = JSON.parse(err.message);
			res.status(error.code).json(responseError(error.message));
		}
	});
};
