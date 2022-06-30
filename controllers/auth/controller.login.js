const { responseSuccess } = require("../../libs/response");

exports.handleLogin = (req, res) => {
	const data = { ...req.decoded, token: req.token };
	res.status(200).json(responseSuccess("retrieved", data));
};
