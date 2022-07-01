const { responseSuccess, responseError } = require("../../libs/response");
const { usersModel } = require("../../models");
const { uploadPhotoProfile } = require("../../middlewares/multer");

const upload = uploadPhotoProfile.single("photo_profile");

exports.updateOne = (req, res) => {
	upload(req, res, async (error) => {
		try {
			const { id: bodyId, role } = req.decoded;
			const { id } = req.params;
			if (error) {
				throw new Error(JSON.stringify({ code: 400, message: error.message }));
			}
			const data = {
				...req.body,
				email: req.body.email.toLowerCase().trim(),
				phone_number: req.body.phone_number.trim(),
				photo_profile: req.file ? `/${req.file.path.split("\\").slice(-3).join("/")}` : null,
			};
			if (Number(id)) {
				if (role !== "admin") {
					if (Number(id) !== Number(bodyId)) {
						throw new Error(
							JSON.stringify({ code: 403, message: `Only User with id (${id}) can access!` })
						);
					}
				}
				const results = await usersModel.update.updateOneModel(data, id);
				res.status(200).json(responseSuccess("updated", results));
			} else {
				throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
			}
		} catch (err) {
			const error = JSON.parse(err.message);
			res.status(error.code).json(responseError(error.message));
		}
	});
};
