const { responseSuccess, responseError } = require("../../libs/response");
const { usersModel } = require("../../models");
const { uploadPhotoProfile } = require("../../middlewares/multer");

const upload = uploadPhotoProfile.single("photo_profile");

exports.insertOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			}
			const data = {
				...req.body,
				email: req.body.email.toLowerCase().trim(),
				phone_number: req.body.phone_number.trim(),
				photo_profile: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
			};
			const results = await usersModel.insert.insertOneModel(data);
			res.status(200).json(responseSuccess("added", results));
		} catch (err) {
			const error = JSON.parse(err.message);
			res.status(error.code).json(responseError(error.message));
		}
	});
};
