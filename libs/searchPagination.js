const { sequelize } = require("../models");

const getPagination = (page, size) => {
	const limit = size ? +size : 10;
	const offset = page ? (page - 1) * limit : 0;
	return { limit, offset };
};

const getPagingData = (data, page, limit) => {
	const { count: totalRows, rows } = data;
	const currentPage = page ? +page : 1;
	const totalPages = Math.ceil(totalRows / limit);
	return { rows, currentPage, totalPages, totalRows };
};

const getSortOrder = (sort, order) => {
	if (!sort) return null;
	switch (sort) {
		case "likedCount":
			return [[sequelize.literal('"likedCount"'), order]];
		case "savedCount":
			return [[sequelize.literal('"savedCount"'), order]];
		default:
			return [[sort, order]];
	}
};

module.exports = { getPagination, getPagingData, getSortOrder };
