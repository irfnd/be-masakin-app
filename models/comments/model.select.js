const db = require("../connection");

const table = "comments";
const sql = {
	selectAll: `SELECT * FROM ${table} ORDER BY posted_at ASC`,
	selectById: `SELECT * FROM ${table} WHERE id = $1`,
	selectByRecipe: `SELECT * FROM ${table} WHERE id_recipe = $1 ORDER BY posted_at ASC`,
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
					reject(new Error(JSON.stringify({ code: 404, message: "Data not found!" })));
				}
				resolve(result.rows);
			}
		});
	});
};

exports.selectByRecipeModel = (id_recipe) => {
	return new Promise((resolve, reject) => {
		db.query(sql.selectByRecipe, [id_recipe], (err, result) => {
			if (err) {
				reject(new Error(JSON.stringify({ code: 500, message: err.message })));
			} else {
				resolve(result.rows);
			}
		});
	});
};
