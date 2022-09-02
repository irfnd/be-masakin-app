const status = require("http-status");
const { Users } = require("../models");
const { deleteFile } = require("../middlewares/multer");
const { responseSuccess } = require("../libs/response");

const uploadPhoto = async (req, res, next) => {
	const { id } = req.decoded;
	try {
		const checkUser = await Users.findByPk(id);
		if (!checkUser) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		const results = await Users.update(
			{ photo: req?.file?.publicUrl, photoName: req?.file?.fileRef?.metadata?.name },
			{ where: { id }, returning: true }
		);
		res.json(responseSuccess("updated", results[1][0]));
	} catch (err) {
		next(err);
	}
};
const deletePhoto = async (req, res, next) => {
	const { id } = req.decoded;
	try {
		const checkUser = await Users.findByPk(id);
		if (!checkUser) throw new Error("User not found!", { cause: { code: status.NOT_FOUND } });
		await deleteFile(checkUser.photoName);
		await Users.update({ photo: null, photoName: null }, { where: { id } });
		res.json(responseSuccess("updated", { id }));
	} catch (error) {
		next(error);
	}
};

module.exports = { uploadPhoto, deletePhoto };
