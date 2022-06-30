const { responseSuccess, responseError } = require("../../libs/response");
const { recipesModel } = require("../../models");
const { uploadPhotoRecipe } = require("../../middlewares/multer");

const upload = uploadPhotoRecipe.single("photo_recipe");

exports.insertOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			}
			const data = {
				...req.body,
				photo_recipe: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
				id_owner: req.decoded.id,
			};
			const results = await recipesModel.insert.insertOneModel(data);
			res.status(200).json(responseSuccess("added", results));
		} catch (err) {
			const error = JSON.parse(err.message);
			res.status(error.code).json(responseError(error.message));
		}
	});
};
