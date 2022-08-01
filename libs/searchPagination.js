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
	return sort ? [[sort, order]] : null;
};

module.exports = { getPagination, getPagingData, getSortOrder };
