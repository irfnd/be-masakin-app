const multer = require("multer");
const { responseSuccess } = require("../../libs/response");
const { usersModel } = require("../../models");
const { uploadPhotoProfile } = require("../../middlewares/multer");

const upload = uploadPhotoProfile.single("photo_profile");

exports.updateOne = (req, res, next) => {
	upload(req, res, async (error) => {
		try {
			const { id } = req.params;
			if (error || error instanceof multer.MulterError) {
				if (error.code === "LIMIT_FILE_SIZE") {
					throw new Error(JSON.stringify({ code: 400, message: "File size must less than 1MB" }));
				}
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			}
			const data = {
				...req.body,
				email: req.body.email.toLowerCase().trim(),
				phone_number: req.body.phone_number.trim(),
				photo_profile: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
			};
			if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
			const results = await usersModel.update.updateOneModel(data, id);
			res.status(200).json(responseSuccess("updated", results));
		} catch (err) {
			next(err);
		}
	});
};
