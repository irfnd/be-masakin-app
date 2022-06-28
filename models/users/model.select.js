const db = require("../connection");

const table = "users";
const sql = {
	selectAll: `SELECT * FROM ${table}`,
	selectById: `SELECT * FROM ${table} WHERE id = $1`,
};

exports.selectAllModel = () => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectAll, (err, result) => {
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

exports.selectByIdModel = (id) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectById, [id], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				if (result.rowCount === 0) {
					reject(
						new Error(
							JSON.stringify({
								code: 404,
								message: "Data not found!",
							})
						)
					);
				}
				resolve(result.rows);
			}
		});
	});
};
