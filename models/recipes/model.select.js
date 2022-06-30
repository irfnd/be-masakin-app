const db = require("../connection");

const table = "recipes";
const sql = {
	selectTotal: `SELECT COUNT(*) FROM ${table}`,
	selectAll: `SELECT * FROM ${table}`,
	selectAllPagination: `SELECT * FROM ${table} ORDER BY updated_at DESC LIMIT $2 OFFSET (($1 - 1) * $2)`,
	selectById: `SELECT * FROM ${table} WHERE id = $1`,
	selectByOwner: `SELECT * FROM ${table} WHERE id_owner = $1`,
	selectByName: `SELECT * FROM ${table} WHERE LOWER(title) LIKE $1`,
	selectLatest: `SELECT * FROM ${table} ORDER BY updated_at DESC LIMIT $1`,
};

exports.selectTotalModel = () => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectTotal, (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				resolve(result.rows);
			}
		});
	});
};

exports.selectAllModel = () => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectAll, (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				resolve(result.rows);
			}
		});
	});
};

exports.selectAllPaginationModel = (page, size) => {
	return new Promise((resolve, reject) => {
		if (page && size) {
			db.query(sql.selectAllPagination, [page, size], (err, result) => {
				if (err) {
					reject(new Error(JSON.stringify({ code: 500, message: err.message })));
				} else {
					if (result.rowCount === 0) {
						reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
					}
					resolve(result.rows);
				}
			});
		}
	});
};

exports.selectByIdModel = (id) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectById, [id], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
				}
				resolve(result.rows);
			}
		});
	});
};

exports.selectByOwnerModel = (id_owner) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByOwner, [id_owner], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
				}
				resolve(result.rows);
			}
		});
	});
};

exports.selectByNameModel = (query) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByName, [`%${query.toLowerCase()}%`], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
				}
				resolve(result.rows);
			}
		});
	});
};

exports.selectLatestModel = () => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectLatest, [5], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
				}
				resolve(result.rows);
			}
		});
	});
};
