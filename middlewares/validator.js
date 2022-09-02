const status = require("http-status");
const validator = require("../libs/validator");

module.exports = (schema, request = "body") => {
	return async (req, res, next) => {
		try {
			if (request === "body") {
				const validated = await validator[schema].validate(req.body);
				req.body = validated;
				return next();
			}
			if (request === "query") {
				const validated = await validator[schema].validate(req.query);
				req.query = validated;
				return next();
			}
		} catch (err) {
			const errors = new Error(err.message, { cause: { code: status.BAD_REQUEST } });
			next(errors);
		}
	};
};
