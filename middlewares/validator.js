const validator = require("../libs/validator");
const { responseError } = require("../libs/response");

module.exports = (schema) => {
	return async (req, res, next) => {
		try {
			const validated = await validator[schema].validateAsync(req.body);
			req.body = validated;
			next();
		} catch (err) {
			res.status(400).json(responseError(err.message));
		}
	};
};
