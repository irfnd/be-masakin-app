const { responseError } = require("../libs/response");

module.exports = (err, req, res, next) => {
	if (err.name === "SequelizeUniqueConstraintError") {
		return res.status(500).json({ ...responseError(err.message), details: err.errors.map((el) => el.message) });
	} else {
		res.status(err?.cause?.code || 500).json(responseError(err.message));
	}
};
