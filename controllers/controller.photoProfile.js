const status = require("http-status");
const { Users } = require("../models");
const { deleteFile } = require("../middlewares/multer");
// const { cookiesOptions } = require("../libs/cookies");
// const { crypto } = require("../libs/crypto");
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
		const newUser = {
			id: results[1][0].id,
			email: results[1][0].email,
			isVerified: results[1][0].isVerified,
			name: results[1][0].name,
			photo: results[1][0].photo,
			photoName: results[1][0].photoName,
			role: results[1][0].role,
		};
		// res.cookie("user", crypto.encryptData(JSON.stringify(newUser)), cookiesOptions);
		res.json(responseSuccess("updated", newUser));
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
