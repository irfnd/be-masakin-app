const status = require("http-status");
const validator = require("../libs/validator");

module.exports = (schema) => {
	return async (req, res, next) => {
		try {
			const validated = await validator[schema].validate(req.body);
			req.body = validated;
			next();
		} catch (err) {
			const errors = new Error(err.message, { cause: { code: status.BAD_REQUEST } });
			next(errors);
		}
	};
};
