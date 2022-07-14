const { responseError } = require("../libs/response");

module.exports = (err, req, res, next) => {
	const error = JSON.parse(err);
	res.status(error.code).json(responseError(error.message));
};
