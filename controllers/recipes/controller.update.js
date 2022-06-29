const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { recipesModel } = require("../../models");
const { uploadPhotoRecipe } = require("../../middlewares/multer");

const upload = uploadPhotoRecipe.single("photo_recipe");

exports.updateOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			const { id } = req.params;
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			} else {
				const data = {
					...req.body,
					photo_recipe: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
				};
				if (Number(id)) {
					const results = await recipesModel.update.updateOneModel(data, id);
					res.status(200).json(responseSuccess("updated", results));
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
