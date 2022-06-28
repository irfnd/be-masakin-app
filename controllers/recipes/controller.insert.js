const { responseSuccess, responseError } = require("../../libs/responseFormat/response");
const { recipesModel } = require("../../models");
const { uploadPhotoRecipe } = require("../../middlewares/multer");

const upload = uploadPhotoRecipe.single("photo_recipe");

exports.insertOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			} else {
				const data = {
					...req.body,
					photo_recipe: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
				};
				const results = await recipesModel.insert.insertOneModel(data);
				res.status(200).json(responseSuccess("Successfully added data.", results));
			}
		} catch (err) {
			const error = JSON.parse(err.message);
			res.status(error.code).json(responseError(error.message));
		}
	});
};
