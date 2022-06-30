const { responseSuccess, responseError } = require("../../libs/response");
const { usersModel } = require("../../models");
const { deleteFile } = require("../../libs/deleteFile");

exports.deleteOne = async (req, res) => {
	const { id: bodyId, role } = req.decoded;
	const { id } = req.params;
	try {
		if (Number(id)) {
			if (role !== "admin") {
				if (Number(id) !== Number(bodyId)) {
					throw new Error(
						JSON.stringify({ code: 403, message: `Only User with id (${id}) can access!` })
					);
				}
			}
			const results = await usersModel.delete.deleteOneModel(id);
			if (results.request[0].photo_profile !== null) {
				await deleteFile(results.request[0].photo_profile);
			}
			res.status(200).json(responseSuccess("deleted", results));
		} else {
			throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		}
	} catch (err) {
		const error = JSON.parse(err.message);
		res.status(error.code).json(responseError(error.message));
	}
};
